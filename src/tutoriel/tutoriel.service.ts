// src/articles/articles.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './tutoriel.interface';

@Injectable()
export class TutorielService {
  constructor(@InjectModel('Article') private readonly tutorielModel: Model<Article>) {}

  async createTutoriel(createTutorielDto: any): Promise<Article> {
    const newArticle = new this.tutorielModel(createTutorielDto);
    return await newArticle.save();
  }

  async getTutoriel(): Promise<Article[]> {
    return await this.tutorielModel.find().exec();
  }

  async getTutorielById(id: string): Promise<Article> {
    return await this.tutorielModel.findById(id).exec();
  }

  async updateTutoriel(id: string, updateTutorielDto: any): Promise<Article> {
    return await this.tutorielModel.findByIdAndUpdate(id, updateTutorielDto, { new: true }).exec();
  }

  async deleteTutoriel(id: string): Promise<any> {
    return await this.tutorielModel.findByIdAndDelete(id).exec();
  }
}