import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1h' } })],
    controllers: [ApiController],
    providers: [ApiService],
    exports: [ApiService],
})
export class ApiModule { }
