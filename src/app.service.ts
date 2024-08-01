import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Bonjour, bienvenue sur l'API de Galaxy-Code";
  }
}
