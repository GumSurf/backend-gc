import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { AccountController } from './account/account.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/user.entity';
import { TryConnexion } from './try.connexion';
import { TutorialController } from './tutorial/tutorial.controller';
import { TutorialService } from './tutorial/tutorial.service';
import { TutorialSchema } from './tutorial/tutorial.schema';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forRoot('mongodb+srv://GumSurf:Iledesein29@galaxy-code-cluster.yqoq4dv.mongodb.net'),
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Tutorial', schema: TutorialSchema },
        ]),
    ],
    controllers: [AppController, AuthController, AccountController, TutorialController],
    providers: [AppService, AuthService, UserService, TryConnexion, TutorialService],
})
export class AppModule { }
