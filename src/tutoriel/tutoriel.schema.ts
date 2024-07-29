// src/articles/article.schema.ts
import * as mongoose from 'mongoose';

export const TutorielSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
