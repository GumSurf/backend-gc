import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 4000;

    app.enableCors({
        origin: '*',  // Accepte toutes les origines
        methods: '*', // Accepte toutes les méthodes
        allowedHeaders: '*', // Accepte tous les en-têtes
        credentials: true,
    });

    await app.listen(port);
}
bootstrap();
