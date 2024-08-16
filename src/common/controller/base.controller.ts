import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BaseService } from '../service/base.service';  // Assurez-vous que le chemin est correct
import { Document } from 'mongoose';

export abstract class BaseController<T extends Document> {
  constructor(private readonly service: BaseService<T>) {}

  @Post()
  async create(@Body() createDto: any): Promise<T> {
    return this.service.create(createDto);
  }

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T | null> {
    return this.service.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any): Promise<T | null> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.service.delete(id);
  }

  @Post(':id/comments')
  async addComment(@Param('id') id: string, @Body() commentDto: any): Promise<T | null> {
    return this.service.addComment(id, commentDto);
  }

  @Get(':id/comments')
  async getComments(@Param('id') id: string): Promise<any[]> {
    return this.service.getComments(id);
  }
}
