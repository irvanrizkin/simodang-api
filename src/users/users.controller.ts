import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('users')
export class UsersController {
  @Get('/profile')
  @UseGuards(TokenGuard)
  getProfile(@Request() req) {
    const { user } = req;

    return user;
  }
}
