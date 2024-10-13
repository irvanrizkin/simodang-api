import { Controller, Get } from '@nestjs/common';
import { PricingPlanService } from './pricing-plan.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('pricing-plan')
@ApiTags('pricing-plan')
export class PricingPlanController {
  constructor(private readonly pricingPlanService: PricingPlanService) {}

  @Get()
  findAll() {
    return this.pricingPlanService.findAll();
  }
}
