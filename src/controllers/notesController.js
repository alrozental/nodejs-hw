import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    if (!notes) {
      return res.status(404).json({ message: 'Notes not found' });
    }
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.noteId,
      { title, content },
      { new: true },
    );
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};
