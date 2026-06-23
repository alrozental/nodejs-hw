import createError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  const skip = (page - 1) * perPage;

  const query = { userId: req.user._id };

  if (tag) {
    query.tag = tag;
  }
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const notesQuery = Note.find(query);

  const [totalNotes, notes] = await Promise.all([
    notesQuery.skip(skip).limit(Number(perPage)),
  ]);
  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const { title, content, tag } = req.body;

  const newNote = new Note({
    title,
    content,
    tag,
    userId: req.user._id,
  });

  const savedNote = await newNote.save();
  res.status(201).json(savedNote);
};

export const deleteNote = async (req, res) => {
  const deletedNote = await Note.findOneAndDelete({
    _id: req.params.noteId,
    userId: req.user._id,
  });

  if (!deletedNote) {
    throw createError(404, 'Note not found');
  }
  res.status(200).json(deletedNote);
};

export const updateNote = async (req, res) => {
  const { title, content, tag } = req.body;

  const updatedNote = await Note.findOneAndUpdate(
    { _id: req.params.noteId, userId: req.user._id },
    { title, content, tag },
    { returnDocument: 'after' },
  );

  if (!updatedNote) {
    throw createError(404, 'Note not found');
  }
  res.status(200).json(updatedNote);
};
