import { ApiProperty } from '@nestjs/swagger';
import { Log } from '@prisma/client';

export class LogEntity implements Log {
  @ApiProperty({
    description: 'Log id for identifier, automatically generated.',
  })
  id: string;

  @ApiProperty({
    description: 'Scope where the error logged',
  })
  scope: string;

  @ApiProperty({
    description: 'Summary about the error',
  })
  summary: string;

  @ApiProperty({
    description: 'Date when the log is created. In ISO format.',
  })
  createdAt: Date;
}
