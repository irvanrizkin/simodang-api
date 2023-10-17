import { ApiProperty } from '@nestjs/swagger';
import { Metric } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class MetricEntity implements Metric {
  @ApiProperty({
    description: 'Metric id for identifier, automatically generated.',
  })
  id: string;

  @ApiProperty({
    description: 'Temperature value sent from devices. Decimal.toString()',
  })
  temperature: Decimal;

  @ApiProperty({
    description: 'pH value sent from devices. Decimal.toString()',
  })
  ph: Decimal;

  @ApiProperty({
    description:
      'Total dissolved oxygen value sent from devices. Decimal.toString()',
  })
  tdo: Decimal;

  @ApiProperty({
    description:
      'Total dissolved solids value sent from devices. Decimal.toString()',
  })
  tds: Decimal;

  @ApiProperty({
    description: 'Turbidity value sent from devices. Decimal.toString()',
  })
  turbidity: Decimal;

  @ApiProperty({
    description: 'Date when the metric is created. In ISO format.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the metric is created. In WIB format.',
  })
  createdAtWib: string;

  @ApiProperty({
    description: 'To determine the metric written in which device',
  })
  deviceId: string;

  @ApiProperty({
    description: 'Optionally, to determine the metric written in which pond',
  })
  pondId: string;
}
