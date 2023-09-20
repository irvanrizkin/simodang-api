import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/logout')
  @UseGuards(TokenGuard)
  logout(@Request() req) {
    const { id } = req.user;

    return this.authService.logout(id);
  }

  @Post(':uid')
  async loginFirebase(@Param('uid') uid: string) {
    try {
      return this.authService.loginFirebase(uid);
    } catch (error) {
      console.log(error);
    }
  }
}
