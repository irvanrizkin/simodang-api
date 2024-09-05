import { ApiProperty } from "@nestjs/swagger";
import { PricingPlan } from "@prisma/client";

export class PricingPlanEntity implements PricingPlan {
    @ApiProperty({
        description: 'Pricing plan id for identifier, automatically generated.',
    })
    id: string;
    
    @ApiProperty({
        description: 'Name of the pricing plan.',
    })
    name: string;
    
    @ApiProperty({
        description: 'Description of the pricing plan.',
    })
    description: string;
    
    @ApiProperty({
        description: 'Number of ponds that can be created.',
    })
    pondLimit: number;
    
    @ApiProperty({
        description: 'Duration of the pricing plan.',
    })
    duration: number;
    
    @ApiProperty({
        description: 'Price of the pricing plan.',
    })
    price: number;
    
    @ApiProperty({
        description: 'Status whether the pricing plan is active or not.',
    })
    createdAt: Date;
}
