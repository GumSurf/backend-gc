import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

const jwtSecret = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      const token = jwt.sign({ username: user.username, userId: user.id }, jwtSecret);
      console.log("Return token");
      return token;
    } else {
        console.log("Error Connexion");
      return null;
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    // Vérifiez si l'utilisateur existe dans la base de données
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      // Retournez l'utilisateur si le mot de passe correspond
      console.log("l'utilisateur existe");
      return user;
    }
    // Retournez null si l'utilisateur n'est pas trouvé ou si le mot de passe est incorrect
    console.log("l'utilisateur n'existe pas");
    return null;
  }

  async generateJwtToken(username: string, password: string): Promise<string | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
        console.log("jwtSecret = ", jwtSecret);
      const token = jwt.sign({ username: user.username, userId: user.id }, jwtSecret);
      return token;
    }
    return null;
  }
}
