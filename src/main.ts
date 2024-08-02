import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 4000;

    app.enableCors({
        origin: ['http://localhost:3000', 'https://galaxy-code-frontend.vercel.app/'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Inclure les cookies si nécessaire
    });

    await app.listen(port);
}
bootstrap();
