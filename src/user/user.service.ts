import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const { password, ...rest } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new this.userModel({ ...rest, password: hashedPassword });
        return createdUser.save();
      }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async verifyEmailConfirmationToken(token: string): Promise<UserDocument | null> {
        try {
            // Décodez le token pour obtenir les données de l'utilisateur
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { email: string };

            // Recherchez l'utilisateur dans la base de données en utilisant l'e-mail décodé
            const user = await this.userModel.findOne({ email: decodedToken.email }).exec();

            // Vérifiez si l'utilisateur existe et retournez-le
            if (user) {
                return user;
            }

            // Retournez null si l'utilisateur n'est pas trouvé
            return null;
        } catch (error) {
            // Gérez les erreurs de vérification du token (par exemple, token invalide, expiré, etc.)
            console.error('Erreur lors de la vérification du token :', error);
            return null;
        }
    }

    async confirmUserEmail(email: string): Promise<void> {
        try {
            // Mettez à jour le statut de confirmation d'e-mail de l'utilisateur dans la base de données
            await this.userModel.updateOne({ email }, { emailConfirmed: true }).exec();
        } catch (error) {
            // Gérez les erreurs de mise à jour dans la base de données
            console.error('Erreur lors de la confirmation de l\'e-mail de l\'utilisateur :', error);
            throw new Error('Erreur lors de la confirmation de l\'e-mail de l\'utilisateur');
        }
    }
}