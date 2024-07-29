import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorielService } from './tutoriel.service';
import { ArticleController } from './tutoriel.controller';
import { TutorielSchema } from './tutoriel.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Article', schema: TutorielSchema }])],
  providers: [TutorielService],
  controllers: [ArticleController],
})
export class TutorielModule {}
