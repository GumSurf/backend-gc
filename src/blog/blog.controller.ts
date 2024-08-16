import { Controller, Query, Get } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './blog.interface';
import { BaseController } from '../common/controller/base.controller';

@Controller('api/blogs')
export class BlogController extends BaseController<Blog> {
  constructor(private readonly blogService: BlogService) {
    super(blogService);
  }

  @Get()
  async findAll(@Query('search') search?: string) {
    console.log("search = ", search);
    if (search) {
      return this.blogService.search(search.toLowerCase());
    }
    // Si aucun terme de recherche n'est fourni, renvoie tous les tutoriels
    return super.findAll();
  }
}
