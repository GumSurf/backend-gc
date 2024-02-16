import * as jwt from 'jsonwebtoken';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        // Récupérer le jeton JWT depuis les en-têtes de la requête
        const token = request.headers.authorization?.split(' ')[1];

        // Vérifier si le jeton JWT existe
        if (!token) {
            return false; // Jeton manquant, accès refusé
        }

        try {
            // Vérifier et décoder le jeton JWT
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Vous pouvez ajouter des vérifications supplémentaires ici, par exemple :
            // - Vérifier si le jeton est expiré
            // - Vérifier si le jeton est valide pour cet utilisateur spécifique
            // - etc.

            // Ajouter les informations du jeton décodé à la requête pour un accès ultérieur dans les gestionnaires de requêtes
            request.user = decodedToken;

            return true; // Accès autorisé
        } catch (error) {
            return false; // Erreur lors de la vérification du jeton, accès refusé
        }
    }
}
