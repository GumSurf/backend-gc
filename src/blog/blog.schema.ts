import mongoose, { Document, Schema } from 'mongoose';
import { Paragraph } from '../common/interfaces/paragraph.interface';
import { Comment } from '../common/interfaces/comment.interface';
import { Blog } from './blog.interface';

// Définir les schémas pour les sous-documents
const ParagraphSchema = new Schema<Paragraph>({
  type: { type: String, enum: ['text', 'code'], required: true },
  content: { type: String, required: true },
});

const CommentSchema = new Schema<Comment>({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Définir le schéma principal
export const BlogSchema = new Schema<Blog>({
  title: { type: String, required: true },
  content: { type: [ParagraphSchema], required: true },
  author: { type: String, required: true },
  comments: { type: [CommentSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Créer le modèle Mongoose
export const BlogModel = mongoose.model<Blog>('Blog', BlogSchema);
