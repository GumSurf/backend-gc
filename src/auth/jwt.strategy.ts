import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNzkzMjU3MSwiaWF0IjoxNzA3OTMyNTcxfQ.2gHByHKJOo07qS-NlZEEsjiIsBafkAbdfSr1Y0iRw3Q', // Remplacez par votre clé secrète
    });
  }

  async validate(payload: any) {
    return this.authService.validateUser(payload.username, payload.password);
  }
}
