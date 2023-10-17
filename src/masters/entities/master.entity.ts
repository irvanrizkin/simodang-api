import { ApiProperty } from '@nestjs/swagger';
import { Master } from '@prisma/client';

export class MasterEntity implements Master {
  @ApiProperty({
    description: 'Master id for identifier. Filled by admin',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the master.',
  })
  name: string;

  @ApiProperty({
    description: 'A phone number for IoT GSM connection',
  })
  simNumber: string;

  @ApiProperty({
    description: 'Date when the master is created. In ISO format.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'To determine the owner of the master.',
  })
  userId: string;
}
