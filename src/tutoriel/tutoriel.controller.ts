import { Controller, Query, Get } from '@nestjs/common';
import { TutorielService } from './tutoriel.service';
import { Tutoriel } from './tutoriel.interface';
import { BaseController } from '../common/controller/base.controller';

@Controller('api/tutoriels')
export class TutorielController extends BaseController<Tutoriel> {
  constructor(private readonly tutorielService: TutorielService) {
    super(tutorielService);
  }

  @Get()
  async findAll(@Query('search') search?: string) {
    console.log("search = ", search);
    if (search) {
      return this.tutorielService.search(search.toLowerCase());
    }
    // Si aucun terme de recherche n'est fourni, renvoie tous les tutoriels
    return super.findAll();
  }
}
