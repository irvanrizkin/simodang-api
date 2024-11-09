import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { TokenGuard } from 'src/guard/token.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserGuard } from 'src/guard/user.guard';

@Controller('subscription')
@UseGuards(TokenGuard, UserGuard)
@ApiTags('subscription')
@ApiBearerAuth()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/buy/:pricingPlanId')
  buySubscription(
    @Request() req,
    @Param('pricingPlanId') pricingPlanId: string,
  ) {
    const user: UserEntity = req.user;

    return this.subscriptionService.buySubscription({
      pricingPlanId,
      user,
    });
  }
}
