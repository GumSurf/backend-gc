import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiService } from './api.service'; // Assurez-vous que le service ApiService est correctement importé

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('validate-token')
  async validateToken(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ valid: false });
    }

    try {
      const isValid = await this.apiService.validateToken(token);
      if (isValid) {
        return res.status(HttpStatus.OK).json({ valid: true });
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({ valid: false });
      }
    } catch (error) {
      console.error('Erreur lors de la validation du token:', error);
      return res.status(HttpStatus.UNAUTHORIZED).json({ valid: false });
    }
  }
}
