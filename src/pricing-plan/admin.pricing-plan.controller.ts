import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PricingPlanService } from './pricing-plan.service';
import { CreatePricingPlanDto } from './dto/create-pricing-plan.dto';
import { UpdatePricingPlanDto } from './dto/update-pricing-plan.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { AdminGuard } from 'src/guard/admin.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('admin/pricing-plan')
@UseGuards(TokenGuard, AdminGuard)
@ApiTags('admin/pricing-plan')
@ApiBearerAuth()
export class AdminPricingPlanController {
  constructor(private readonly pricingPlanService: PricingPlanService) {}

  @Post()
  create(@Body() createPricingPlanDto: CreatePricingPlanDto) {
    return this.pricingPlanService.create(createPricingPlanDto);
  }

  @Get()
  findAll() {
    return this.pricingPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricingPlanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePricingPlanDto: UpdatePricingPlanDto) {
    return this.pricingPlanService.update(id, updatePricingPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricingPlanService.remove(id);
  }
}
