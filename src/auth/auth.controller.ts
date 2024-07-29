import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as nodemailer from 'nodemailer';
import { generateEmailConfirmationToken, verifyEmailConfirmationToken } from '../utils/tokenUtils';
import * as jwt from 'jsonwebtoken';
import { User } from '../user/user.model';
import { Table } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        try {
            // Utilisez le service UserService pour créer un nouveau compte
            await this.userService.create(createUserDto); // Envoyez l'objet complet CreateUserDto au service

            console.log("avant send email confirmation");
            const payload = { email: createUserDto.email };

            await this.sendConfirmationEmail(payload);

            console.log("finish all is good");

            // Vous pouvez également retourner une réponse appropriée, par exemple un message de succès
            return { message: 'User created successfully' };
        } catch (error) {
            // Gérez les erreurs lors de la création du compte utilisateur
            throw new Error('Failed to create user');
        }
    }

    @Post('login')
    async login(@Body() credentials: { email: string, password: string }) {
        try {
            // Utilisez le service AuthService pour générer le token JWT
            const token = await this.authService.generateJwtToken(credentials.email, credentials.password);
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

    async sendConfirmationEmail(payload: { email: string }) {
        const nodemailer = require('nodemailer');

        // Créer un transporteur nodemailer
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true pour 465, false pour les autres ports
            auth: {
                user: 'gumsurf29@gmail.com', // adresse e-mail Gmail
                pass: 'npwy xpwy oxfx escg' // mot de passe Gmail
            }
        });
            
        console.log("avant creation token");
        const token = generateEmailConfirmationToken(payload);
        console.log("apres creation token");

        // Options pour l'e-mail de confirmation
        const mailOptions = {
            from: 'gumsurf29@gmail.com',
            to: payload.email,
            subject: 'Confirmez votre adresse e-mail',
            html: `<p>Merci de vous être inscrit. Cliquez sur le lien suivant pour confirmer votre adresse e-mail :</p>
             <a href="http://localhost:5678/confirm-email/${token}">Confirmez votre adresse e-mail</a>`
        };

        console.log("juste avant l'envoie de l'email");
        // Envoyer l'e-mail de confirmation
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            }
            console.log('E-mail envoyé avec succès :', info.response);
        });
        
        console.log("email envoyer");
    }
}

@Controller()
export class ConfirmEmailController {
    constructor(private readonly userService: UserService) { }

    @Get('confirm-email/:token')
    async confirmEmail(@Param('token') token: string, @Res() res) {
        try {
            // Vérifier et extraire les données du token
            const userData = await this.userService.verifyEmailConfirmationToken(token);

            console.log("userData =", userData);
            // Marquer l'e-mail comme confirmé dans la base de données
            await this.userService.confirmUserEmail(userData.email);

            // Rediriger l'utilisateur vers la page de connexion
            return res.redirect('http://localhost:3000/login');
        } catch (error) {
            // Gérer les erreurs de validation du token
            console.error('Erreur lors de la confirmation d\'e-mail :', error);
            return res.status(400).send('Le lien de confirmation est invalide ou expiré.');
        }
    }
}
