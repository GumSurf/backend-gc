import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TutorielService } from './tutoriel.service';

@Controller('api/tutoriels')
export class TutorielController {
  constructor(private readonly tutorielsService: TutorielService) {}

  @Post()
  async createTutoriel(@Body() createTutorielDto: any) {
    return this.tutorielsService.createTutoriel(createTutorielDto);
  }

  @Get()
  async getTutoriels() {
    return this.tutorielsService.getTutoriels();
  }

  @Get(':id')
  async getTutorielById(@Param('id') id: string) {
    return this.tutorielsService.getTutorielById(id);
  }

  @Put(':id')
  async updateTutoriel(@Param('id') id: string, @Body() updateTutorielDto: any) {
    return this.tutorielsService.updateTutoriel(id, updateTutorielDto);
  }

  @Delete(':id')
  async deleteTutoriel(@Param('id') id: string) {
    return this.tutorielsService.deleteTutoriel(id);
  }
}
