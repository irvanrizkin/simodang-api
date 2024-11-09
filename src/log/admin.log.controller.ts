import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guard/admin.guard';
import { TokenGuard } from 'src/guard/token.guard';
import { LogService } from './log.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { LogEntity } from './entities/log.entity';
import { UserGuard } from 'src/guard/user.guard';

@Controller('admin/log')
@UseGuards(TokenGuard, UserGuard, AdminGuard)
@ApiTags('admin/log')
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
export class AdminLogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @ApiOkResponse({
    description: 'OK',
    type: LogEntity,
    isArray: true,
  })
  findAll() {
    return this.logService.findAll();
  }
}
