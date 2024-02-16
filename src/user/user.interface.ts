import { Document } from 'mongoose';

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface UserDocument extends User, Document {}