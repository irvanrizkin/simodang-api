import {
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { TokenGuard } from 'src/guard/token.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Controller('users')
@UseGuards(TokenGuard)
@ApiTags('users')
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
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Get('/profile')
  async getProfile(@Request() req) {
    const { user } = req;
    const subscription = await this.subscriptionService.getSubscription(
      user.id,
    );

    const name = subscription?.pricingPlan?.name || 'Tidak ada paket';

    return {
      ...user,
      pricingName: name,
    };
  }

  @Patch('/update')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const { id } = req.user;

    return this.usersService.update(id, updateUserDto);
  }
}
