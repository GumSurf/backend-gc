import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TryConnexion implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    try {
      console.log('Tentative de connexion à MongoDB...');
      await this.connection.db;
      console.log('Connexion à MongoDB réussie !');
    } catch (error) {
      console.error('Connexion à MongoDB échouée !', error);
    }
  }
}