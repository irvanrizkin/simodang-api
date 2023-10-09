import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('users')
@UseGuards(TokenGuard)
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  @Get('/profile')
  getProfile(@Request() req) {
    const { user } = req;

    return user;
  }
}
