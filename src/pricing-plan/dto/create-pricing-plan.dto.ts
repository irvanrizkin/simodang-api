import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePricingPlanDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the pricing plan. Cannot empty',
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    description: 'Description of the pricing plan. If empty default to ""',
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    description: 'Number of pond limit. If empty default to 0',
  })
  pondLimit: number;

  @IsOptional()
  @ApiProperty({
    description: 'Number of user limit. If empty default to 0',
  })
  duration: number;

  @IsOptional()
  @ApiProperty({
    description: 'Price of the pricing plan. If empty default to 0',
  })
  price: number;
}
