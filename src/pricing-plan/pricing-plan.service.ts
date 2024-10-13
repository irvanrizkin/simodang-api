import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePricingPlanDto } from './dto/create-pricing-plan.dto';
import { UpdatePricingPlanDto } from './dto/update-pricing-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PricingPlanEntity } from './entities/pricing-plan.entity';

@Injectable()
export class PricingPlanService {
  constructor(private prisma: PrismaService) {}

  async create(createPricingPlanDto: CreatePricingPlanDto) {
    return await this.prisma.pricingPlan.create({
      data: createPricingPlanDto,
    });
  }

  async findAll() {
    return await this.prisma.pricingPlan.findMany();
  }

  async findOne(id: string) {
    const pricingPlan = await this.prisma.pricingPlan.findUnique({
      where: { id },
    });
    if (pricingPlan.price === 0) {
      throw new ForbiddenException('Free plan not found');
    }
    return pricingPlan;
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

  async findFreePlan() {
    const freePlan = await this.prisma.pricingPlan.findFirst({
      where: { price: 0 },
    });
    if (!freePlan) {
      throw new NotFoundException('Free plan not found');
    }
    return freePlan;
  }

  generateMidtransItem(pricingPlanEntity: PricingPlanEntity) {
    return {
      id: pricingPlanEntity.id,
      name: pricingPlanEntity.name,
      price: pricingPlanEntity.price,
      quantity: 1,
    };
  }
}
