import { ApiProperty } from '@nestjs/swagger';
import { Metric } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class MetricEntity implements Metric {
  @ApiProperty()
  id: string;

  @ApiProperty()
  temperature: Decimal;

  @ApiProperty()
  ph: Decimal;

  @ApiProperty()
  tdo: Decimal;

  @ApiProperty()
  tds: Decimal;

  @ApiProperty()
  turbidity: Decimal;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  createdAtWib: string;

  @ApiProperty()
  deviceId: string;

  @ApiProperty()
  pondId: string;
}
