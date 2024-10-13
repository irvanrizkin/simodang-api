import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { SubscriptionController } from './subscription.controller';
import { PricingPlanModule } from 'src/pricing-plan/pricing-plan.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, PricingPlanModule, TransactionsModule],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
