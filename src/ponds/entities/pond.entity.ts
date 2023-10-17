import { ApiProperty } from '@nestjs/swagger';
import { Pond } from '@prisma/client';

export class PondEntity implements Pond {
  @ApiProperty({
    description: 'Pond id for identifier, automatically generated.',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the pond.',
  })
  name: string;

  @ApiProperty({
    description: 'Address of the pond.',
  })
  address: string;

  @ApiProperty({
    description: 'City of the pond.',
  })
  city: string;

  @ApiProperty({
    description: 'Seed date of the pond.',
  })
  seedDate: Date;

  @ApiProperty({
    description: 'Seed count of the pond.',
  })
  seedCount: number;

  @ApiProperty({
    description: 'Image url of the pond.',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Status whether the pond is in good or bad state',
  })
  status: boolean;

  @ApiProperty({
    description: 'Status whether the pond filled by shrimp of not.',
  })
  isFilled: boolean;

  @ApiProperty({
    description: 'Date when the pond is created. In ISO format.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'To determine the owner of the pond.',
  })
  userId: string;

  @ApiProperty({
    description: 'To determine which device connected to this pond',
  })
  deviceId: string;
}
