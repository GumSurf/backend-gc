import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

const secretKey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNzkzMjU3MSwiaWF0IjoxNzA3OTMyNTcxfQ.2gHByHKJOo07qS-NlZEEsjiIsBafkAbdfSr1Y0iRw3Q'; // Remplacez par votre propre clé secrète JWT

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      const token = jwt.sign({ username: user.username, userId: user.id }, secretKey);
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
}
