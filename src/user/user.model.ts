import { Document } from 'mongoose';

export interface User {
  username: string;
  email: string;
  password: string;
  role: string;
  emailConfirmed: boolean;
}

export interface UserDocument extends User, Document {}