import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { AdminGuard } from 'src/guard/admin.guard';
import { TokenGuard } from 'src/guard/token.guard';
import { PondsService } from './ponds.service';
import { PondErrorExample } from 'src/errors/examples/pond-error-example';

@Controller('admin/ponds')
@UseGuards(TokenGuard, AdminGuard)
@ApiTags('admin/ponds')
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
export class AdminPondsController {
  constructor(private readonly pondsService: PondsService) {}

  @Delete(':pondId')
  @ApiNotFoundResponse({
    description: 'Not Found',
    content: {
      'application/json': {
        examples: {
          pondNotFound: { value: PondErrorExample.notFound },
        },
      },
    },
  })
  @HttpCode(204)
  remove(@Param('pondId') id: string) {
    return this.pondsService.remove(id);
  }
}
