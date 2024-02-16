import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserSchema } from './user.entity'; // Importez le schema User

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Importez le schema User dans MongooseModule
  ],
  providers: [UserService],
  exports: [UserService], // Exportez le UserService pour qu'il puisse être utilisé dans d'autres modules si nécessaire
})
export class UserModule {}
