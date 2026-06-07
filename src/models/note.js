import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      required: false,
      trim: true,
      enum: TAGS,
      default: 'Todo',
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
noteSchema.index({ tag: 1 });

export const Note = model('Note', noteSchema);
