import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { TutorialService } from './tutorial.service';
import { CreateTutorialDto } from '../dto/tutorial.dto';

@Controller('tutorials')
export class TutorialController {
  constructor(private readonly tutorialService: TutorialService) {}

  @Post()
  async create(@Body() createTutorialDto: CreateTutorialDto): Promise<any> {
    return this.tutorialService.create(createTutorialDto);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.tutorialService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.tutorialService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTutorialDto: CreateTutorialDto): Promise<any> {
    return this.tutorialService.update(id, updateTutorialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.tutorialService.remove(id);
  }
}
