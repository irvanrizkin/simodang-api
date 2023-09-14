import { Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(':uid')
  async loginFirebase(@Param('uid') uid: string) {
    try {
      return this.authService.loginFirebase(uid);
    } catch (error) {
      console.log(error);
    }
  }
}
