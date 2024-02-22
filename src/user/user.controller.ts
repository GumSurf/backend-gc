import { Controller, Get, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(JwtAuthGuard) // Utiliser le garde JwtAuthGuard pour protéger l'endpoint
  getProfile(@Req() req: Request) {
    if (!req['user']) {
        console.log("error get user");
        throw new UnauthorizedException('Unauthorized access'); // Lancer une exception si l'utilisateur n'est pas authentifié
      }
    console.log("tout est bon user get");
    return req['user']; // Récupérer les informations de l'utilisateur à partir de l'objet de requête
  }
}