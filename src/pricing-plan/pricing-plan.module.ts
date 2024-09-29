import { Module } from '@nestjs/common';
import { PricingPlanService } from './pricing-plan.service';
import { PricingPlanController } from './pricing-plan.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminPricingPlanController } from './admin.pricing-plan.controller';

@Module({
  controllers: [PricingPlanController, AdminPricingPlanController],
  providers: [PricingPlanService, PrismaService],
  exports: [PricingPlanService],
})
export class PricingPlanModule {}
