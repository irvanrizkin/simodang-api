import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { PricingPlanModule } from 'src/pricing-plan/pricing-plan.module';

@Module({
  imports: [SubscriptionModule, PricingPlanModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
