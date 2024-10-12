import { Module } from '@nestjs/common';
import { PricingPlanService } from './pricing-plan.service';
import { PricingPlanController } from './pricing-plan.controller';
import { AdminPricingPlanController } from './admin.pricing-plan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PricingPlanController, AdminPricingPlanController],
  providers: [PricingPlanService],
  exports: [PricingPlanService],
})
export class PricingPlanModule {}
