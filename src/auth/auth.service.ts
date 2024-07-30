import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async login(email: string, password: string): Promise<string | null> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            console.log("Error Connexion: User not found");
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("password = ", password);
        console.log("user.password = ", user.password);
        if (!isPasswordValid) {
            console.log("Error Connexion: Invalid password");
            return null;
        }

        console.log("login JWT_SECRET = ", process.env.JWT_SECRET);
        const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Le jeton expire après 1 heure
        });

        console.log("Return token");
        return token;
    }

    async validateEmail(email: string, password: string): Promise<any> {
        // Vérifiez si l'utilisateur existe dans la base de données
        const user = await this.userService.findByEmail(email);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid === true) {
            // Retournez l'utilisateur si le mot de passe correspond
            console.log("l'utilisateur existe");
            return user;
        }
        // Retournez null si l'utilisateur n'est pas trouvé ou si le mot de passe est incorrect
        console.log("l'utilisateur n'existe pas");
        return null;
    }

    async generateJwtToken(email: string, password: string): Promise<string | null> {
        const user = await this.userService.findByEmail(email);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("generateJwtToken = ", process.env.JWT_SECRET);
        if (isPasswordValid === true && user.emailConfirmed === true) {
            const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_SECRET);
            return token;
        }
        return null;
    }
}
