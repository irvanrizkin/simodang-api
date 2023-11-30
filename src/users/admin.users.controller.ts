import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guard/admin.guard';
import { TokenGuard } from 'src/guard/token.guard';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { AdminUpdateUserDto } from './admin-update-user.dto';

@Controller('admin/users')
@UseGuards(TokenGuard, AdminGuard)
@ApiTags('admin/users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
  content: {
    'application/json': {
      examples: {
        noToken: { value: GuardErrorExample.noToken },
      },
    },
  },
})
@ApiForbiddenResponse({
  description: 'Forbidden',
  content: {
    'application/json': {
      examples: {
        tokenMismatch: { value: GuardErrorExample.tokenMismatch },
        notAdmin: { value: GuardErrorExample.notAdmin },
      },
    },
  },
})
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('/:id')
  update(@Param('id') id, @Body() adminupdateUserDto: AdminUpdateUserDto) {
    return this.usersService.update(id, adminupdateUserDto);
  }
}
