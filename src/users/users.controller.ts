import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { TokenGuard } from 'src/guard/token.guard';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(TokenGuard, AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }
}
