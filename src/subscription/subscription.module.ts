import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { SubscriptionController } from './subscription.controller';
import { PricingPlanModule } from 'src/pricing-plan/pricing-plan.module';

@Module({
  imports: [PricingPlanModule, TransactionsModule],
  providers: [SubscriptionService, PrismaService],
  exports: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
