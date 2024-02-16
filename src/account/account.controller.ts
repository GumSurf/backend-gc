import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('account')
export class AccountController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(JwtAuthGuard)
  async login(@Request() req: any) {
    const { username, password } = req.body;
    return this.authService.login(username, password);
  }
}
