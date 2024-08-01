import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 4000;

    app.enableCors({
        origin: ['https://gumsurf.github.io', 'http://localhost:3000', 'https://galaxy-code-backend.vercel.app', 'https://galaxy-code-frontend.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });

    await app.listen(port);
}
bootstrap();
