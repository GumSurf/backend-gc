// blog.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './blog.interface';
import { BaseService } from '../common/service/base.service';

@Injectable()
export class BlogService extends BaseService<Blog> {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {
    super(blogModel); // Passez le modèle au constructeur de BaseService
  }

  async search(query: string): Promise<Blog[]> {
    console.log(`Searching for: ${query}`);
    
    // Recherche dans le champ title et dans le champ content.content
    return this.blogModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Recherche dans le titre
        { 'content.content': { $regex: query, $options: 'i' } } // Recherche dans le contenu des paragraphes
      ]
    }).exec();
  }
}
