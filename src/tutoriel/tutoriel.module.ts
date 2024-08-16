import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorielSchema } from './tutoriel.schema';
import { TutorielService } from './tutoriel.service';
import { TutorielController } from './tutoriel.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tutoriel', schema: TutorielSchema }])],
  providers: [TutorielService],
  controllers: [TutorielController],
  exports: [TutorielService],
})
export class TutorielModule {}
