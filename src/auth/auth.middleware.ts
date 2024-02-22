import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Récupérer le token JWT de l'en-tête Authorization

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Vérifier le token JWT
        if (err) {
          return res.status(401).send({ message: 'Token invalide' });
        }
        req['user'] = decoded; // Ajouter les informations de l'utilisateur décodées à l'objet de requête
        next();
      });
    } else {
      return res.status(401).send({ message: 'Token manquant' });
    }
  }
}