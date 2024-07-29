import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async login(email: string, password: string): Promise<string | null> {
        const user = await this.userService.findByEmail(email);
        if (user && user.password === password) {
            const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_SECRET);
            console.log("Return token");
            return token;
        } else {
            console.log("Error Connexion");
            return null;
        }
    }

    async validateEmail(email: string, password: string): Promise<any> {
        // Vérifiez si l'utilisateur existe dans la base de données
        const user = await this.userService.findByEmail(email);
        if (user && user.password === password) {
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
        if (user && user.password === password && user.emailConfirmed === true) {
            const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_SECRET);
            return token;
        }
        return null;
    }
}
