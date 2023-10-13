import { ApiProperty } from '@nestjs/swagger';

export class MetricAvgEntity {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  temperature: string;

  @ApiProperty()
  ph: string;

  @ApiProperty()
  tdo: string;

  @ApiProperty()
  tds: string;

  @ApiProperty()
  turbidity: string;
}
