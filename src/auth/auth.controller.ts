import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
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
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/logout')
  @UseGuards(TokenGuard)
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
  logout(@Request() req) {
    const { id } = req.user;

    return this.authService.logout(id);
  }

  @Post(':uid')
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
  async loginFirebase(@Param('uid') uid: string) {
    return await this.authService.loginFirebase(uid);
  }
}
