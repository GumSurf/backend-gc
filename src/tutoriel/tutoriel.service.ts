import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tutoriel } from './tutoriel.interface';

@Injectable()
export class TutorielService {
  constructor(@InjectModel('Tutoriel') private readonly tutorielModel: Model<Tutoriel>) {}

  async createTutoriel(createTutorielDto: any): Promise<Tutoriel> {
    const newTutoriel = new this.tutorielModel(createTutorielDto);
    return await newTutoriel.save();
  }

  async getTutoriels(): Promise<Tutoriel[]> {
    return await this.tutorielModel.find().exec();
  }

  async getTutorielById(id: string): Promise<Tutoriel> {
    return await this.tutorielModel.findById(id).exec();
  }

  async updateTutoriel(id: string, updateTutorielDto: any): Promise<Tutoriel> {
    return await this.tutorielModel.findByIdAndUpdate(id, updateTutorielDto, { new: true }).exec();
  }

  async deleteTutoriel(id: string): Promise<any> {
    return await this.tutorielModel.findByIdAndDelete(id).exec();
  }
}