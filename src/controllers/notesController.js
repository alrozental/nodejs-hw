import createError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();

  res.status(200).json(notes);
};

export const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.noteId);
  if (!note) {
    throw createError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const { title, content, tag } = req.body;
  const newNote = new Note({ title, content, tag });
  const savedNote = await newNote.save();
  res.status(201).json(savedNote);
};

export const deleteNote = async (req, res) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
  if (!deletedNote) {
    throw createError(404, 'Note not found');
  }
  res.status(200).json(deletedNote);
};

export const updateNote = async (req, res) => {
  const { title, content, tag } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.noteId,
    { title, content, tag },
    { returnDocument: 'after' },
  );
  if (!updatedNote) {
    throw createError(404, 'Note not found');
  }
  res.status(200).json(updatedNote);
};
