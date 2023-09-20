import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guard/admin.guard';
import { TokenGuard } from 'src/guard/token.guard';
import { UsersService } from './users.service';

@Controller('admin/users')
@UseGuards(TokenGuard, AdminGuard)
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
