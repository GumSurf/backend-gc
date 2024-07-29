import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/user.schema';
import { TryConnexion } from './try.connexion';
import { TutorielModule } from './tutoriel/tutoriel.module';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forRoot('mongodb+srv://Gabriel:rPIFon2xhxJSN2th@galaxy-code-cluster.yqoq4dv.mongodb.net/?retryWrites=true&w=majority&appName=galaxy-code-cluster'),
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
        ]),
        TutorielModule,
    ],
    controllers: [AppController, AuthController],
    providers: [AppService, AuthService, UserService, TryConnexion],
})
export class AppModule { }