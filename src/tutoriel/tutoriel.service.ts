import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseService } from '../common/service/base.service';
import { Tutoriel } from './tutoriel.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TutorielService extends BaseService<Tutoriel> {
  constructor(@InjectModel('Tutoriel') protected readonly model: Model<Tutoriel>) {
    super(model);
  }

  async search(search: string): Promise<Tutoriel[]> {
    console.log(`Searching for: ${search}`);

    try {
      const results = await this.model.find({
        title: { $regex: search, $options: 'i' }  // Recherche insensible à la casse
      }).exec();

      console.log(`Found ${results.length} results`);
      console.log('Results:', results);

      return results;
    } catch (error) {
      console.error('Error during search:', error);
      throw error;  // Rethrow the error to ensure it's properly handled upstream
    }
  }
}
