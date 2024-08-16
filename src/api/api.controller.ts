import { Controller, Post, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('validate-token')
  async validateToken(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException({ valid: false }, HttpStatus.UNAUTHORIZED);
    }

    try {
      const isValid = await this.apiService.validateToken(token);
      if (isValid) {
        return { valid: true };
      } else {
        throw new HttpException({ valid: false }, HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      console.error('Erreur lors de la validation du token:', error);
      throw new HttpException({ valid: false }, HttpStatus.UNAUTHORIZED);
    }
  }
}
