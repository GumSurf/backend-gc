import { Document } from 'mongoose';
import { Paragraph } from '../common/interfaces/paragraph.interface';
import { Comment } from '../common/interfaces/comment.interface';

// Assurez-vous que l'interface étend Document
export interface Blog extends Document {
  title: string;
  content: Paragraph[];
  author: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
