import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTutorialDto } from '../dto/tutorial.dto';

@Injectable()
export class TutorialService {
  constructor(
    @InjectModel('Tutorial') // Utilisez le nom de la collection défini dans MongoDB
    private readonly tutorialModel: Model<any>, // Utilisez 'any' si vous ne spécifiez pas de type de document
  ) {}

  async create(createTutorialDto: CreateTutorialDto): Promise<any> {
    const { title, text, keywords } = createTutorialDto;
    const tutorial = new this.tutorialModel({ title, text, keywords });
    return await tutorial.save();
  }

  async findAll(): Promise<any[]> {
    return await this.tutorialModel.find().exec();
  }

  async findOne(id: string): Promise<any | null> {
    return await this.tutorialModel.findById(id).exec();
  }

  async update(id: string, updateTutorialDto: CreateTutorialDto): Promise<any> {
    return await this.tutorialModel.findByIdAndUpdate(id, updateTutorialDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.tutorialModel.findByIdAndDelete(id).exec();
  }
}
