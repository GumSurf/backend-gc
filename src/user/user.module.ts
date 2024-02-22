import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller'; // Importez le UserController
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserSchema } from './user.entity'; // Importez le schema User
import { AuthMiddleware } from '../auth/auth.middleware'; // Importez votre middleware d'authentification

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Importez le schema User dans MongooseModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService], // Exportez le UserService pour qu'il puisse être utilisé dans d'autres modules si nécessaire
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: 'user/profile', method: RequestMethod.GET }); // Appliquer le middleware à la route GET 'user/profile'
    }
}
