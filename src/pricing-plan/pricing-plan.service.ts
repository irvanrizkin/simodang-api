import { Injectable } from '@nestjs/common';
import { CreatePricingPlanDto } from './dto/create-pricing-plan.dto';
import { UpdatePricingPlanDto } from './dto/update-pricing-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PricingPlanService {
  constructor(private prisma: PrismaService) {}

  async create(createPricingPlanDto: CreatePricingPlanDto) {
    return await this.prisma.pricingPlan.create({
      data: createPricingPlanDto,
    })
  }

  async findAll() {
    return await this.prisma.pricingPlan.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.pricingPlan.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePricingPlanDto: UpdatePricingPlanDto) {
    return await this.prisma.pricingPlan.update({
      where: { id },
      data: updatePricingPlanDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.pricingPlan.delete({
      where: { id },
    });
  }
}
