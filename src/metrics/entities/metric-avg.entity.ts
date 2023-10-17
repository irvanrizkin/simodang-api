import { ApiProperty } from '@nestjs/swagger';

export class MetricAvgEntity {
  @ApiProperty({
    description: 'Averaged date of the metric. In ISO format.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'temperature in average',
  })
  temperature: string;

  @ApiProperty({
    description: 'ph in average',
  })
  ph: string;

  @ApiProperty({
    description: 'total dissolved oxygen in average',
  })
  tdo: string;

  @ApiProperty({
    description: 'total dissolved solids in average',
  })
  tds: string;

  @ApiProperty({
    description: 'turbidities in average',
  })
  turbidity: string;
}
