import { Model, Document } from 'mongoose';

export class BaseService<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(createDto: any): Promise<T> {
    const newDocument = new this.model(createDto);
    return await newDocument.save();
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, updateDto: any): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async addComment(id: string, comment: any): Promise<T | null> {
    return await this.model.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      { new: true }
    ).exec();
  }

  async getComments(id: string): Promise<any[]> {
    const document = await this.model.findById(id).exec();
    return (document as any)?.comments || [];
  }
}
