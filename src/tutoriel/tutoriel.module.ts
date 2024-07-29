import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorielService } from './tutoriel.service';
import { TutorielController } from './tutoriel.controller';
import { TutorielSchema } from './tutoriel.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Tutoriel', schema: TutorielSchema }])],
    providers: [TutorielService],
    controllers: [TutorielController],
})
export class TutorielModule { }
