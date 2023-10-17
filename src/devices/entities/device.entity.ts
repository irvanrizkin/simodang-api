import { ApiProperty } from '@nestjs/swagger';
import { Device } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class DeviceEntity implements Device {
  @ApiProperty({
    description: 'Device id for identifier, filled by admin.',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the device.',
  })
  name: string;

  @ApiProperty({
    description: 'to show the device is enabled to send notification or not.',
  })
  notificationEnabled: boolean;

  @ApiProperty({
    description: 'to prevent notification spam to user.',
  })
  notificationCount: number;

  @ApiProperty({
    description: 'if false, the metric will be saved on temp table.',
  })
  isSaved: boolean;

  @ApiProperty({
    description:
      'to show the device properties is changed or not. WIll false if the device is new.',
  })
  isChanged: boolean;

  @ApiProperty({
    description: 'to show the device is enabled to send notification or not',
  })
  autoWaterEnabled: boolean;

  @ApiProperty({
    description: 'to show the device auto shrimp feed system is enabled or not',
  })
  autoFeedEnabled: boolean;

  @ApiProperty({
    description: 'low threshold for temperature',
  })
  tempLow: Decimal;

  @ApiProperty({
    description: 'high threshold for temperature',
  })
  tempHigh: Decimal;

  @ApiProperty({
    description: 'low threshold for ph',
  })
  phLow: Decimal;

  @ApiProperty({
    description: 'high threshold for ph',
  })
  phHigh: Decimal;

  @ApiProperty({
    description: 'low threshold for total dissolved oxygen',
  })
  tdoLow: Decimal;

  @ApiProperty({
    description: 'high threshold for total dissolved oxygen',
  })
  tdoHigh: Decimal;

  @ApiProperty({
    description: 'low threshold for total dissolved solids',
  })
  tdsLow: Decimal;

  @ApiProperty({
    description: 'high threshold for total dissolved solids',
  })
  tdsHigh: Decimal;

  @ApiProperty({
    description: 'low threshold for turbidities',
  })
  turbiditiesLow: Decimal;

  @ApiProperty({
    description: 'high threshold for turbidities',
  })
  turbiditiesHigh: Decimal;

  @ApiProperty({
    description: 'Date when the device is created. In ISO format.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'to show the ownership of the device.',
  })
  userId: string;

  @ApiProperty({
    description: 'to show the device belongs to which master.',
  })
  masterId: string;
}
