import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user/user.interface'; // Importez l'interface User

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      // Utilisez le service UserService pour créer un nouveau compte
      await this.userService.create(createUserDto); // Envoyez l'objet complet CreateUserDto au service
      // Vous pouvez également retourner une réponse appropriée, par exemple un message de succès
      return { message: 'User created successfully' };
    } catch (error) {
      // Gérez les erreurs lors de la création du compte utilisateur
      console.log("failed")
      throw new Error('Failed to create user');
    }
  }

  @Post('login')
  async login(@Body() credentials: { username: string, password: string }) {
    try {
      // Utilisez le service AuthService pour générer le token JWT
      const token = await this.authService.generateJwtToken(credentials.username, credentials.password);
      if (token) {
        // Si les informations d'identification sont valides, retournez le token JWT
        return { token };
      } else {
        // Si les informations d'identification ne sont pas valides, retournez une erreur
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      // Gérez les erreurs lors de la génération du token JWT
      throw new Error('Failed to login');
    }
  }
}  
