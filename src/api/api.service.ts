import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiService {
  constructor(private readonly jwtService: JwtService) {}

  async validateToken(token: string): Promise<boolean> {
    try {
      // Décode le token sans vérifier la signature
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      console.error('Token invalide:', error);
      return false;
    }
  }

  // Autres méthodes du service d'authentification...
}
