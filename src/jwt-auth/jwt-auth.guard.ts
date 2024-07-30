import * as jwt from 'jsonwebtoken';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly userService: UserService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Récupérer le jeton JWT depuis les en-têtes de la requête
    const token = request.headers.authorization?.split(' ')[1];

    // Vérifier si le jeton JWT existe
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      // Vérifier et décoder le jeton JWT
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      
      // Récupérer les informations utilisateur à partir de la base de données
      const user = await this.userService.findByEmail(decodedToken.email);
      
      // Vérifier si l'utilisateur existe
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      // Ajouter l'utilisateur à la requête pour un accès ultérieur dans les gestionnaires de requêtes
      request.user = user;
      
      return true; // Accès autorisé
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
