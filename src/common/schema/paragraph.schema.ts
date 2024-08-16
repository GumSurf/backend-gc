import { Schema } from 'mongoose';

export const ParagraphSchema = new Schema({
  type: { type: String, enum: ['text', 'code'], required: true },
  content: { type: String, required: true },
});
