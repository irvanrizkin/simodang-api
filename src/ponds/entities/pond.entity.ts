import { ApiProperty } from '@nestjs/swagger';
import { Pond } from '@prisma/client';

export class PondEntity implements Pond {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  seedDate: Date;

  @ApiProperty()
  seedCount: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  isFilled: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  deviceId: string;
}
