import {
  Controller,
  InternalServerErrorException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenGuard } from 'src/guard/token.guard';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { AuthErrorExample } from 'src/errors/examples/auth-error-example';

@Controller('auth')
@ApiTags('auth')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/logout')
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
        },
      },
    },
  })
  logout() {
    return new InternalServerErrorException('Not implemented');
  }

  @Post()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    content: {
      'application/json': {
        examples: {
          wrongCred: { value: AuthErrorExample.wrongCred },
        },
      },
    },
  })
  async authenticate(@Request() req) {
    const { uid } = req;

    return await this.authService.authenticate(uid);
  }
}
