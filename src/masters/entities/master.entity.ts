import { ApiProperty } from '@nestjs/swagger';
import { Master } from '@prisma/client';

export class MasterEntity implements Master {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  simNumber: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: string;
}
