import { ApiProperty } from '@nestjs/swagger';
import { Device } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PondEntity } from 'src/ponds/entities/pond.entity';

export class DevicePondEntity implements Device {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  notificationEnabled: boolean;

  @ApiProperty()
  notificationCount: number;

  @ApiProperty()
  isSaved: boolean;

  @ApiProperty()
  isChanged: boolean;

  @ApiProperty()
  autoWaterEnabled: boolean;

  @ApiProperty()
  autoFeedEnabled: boolean;

  @ApiProperty()
  tempLow: Decimal;

  @ApiProperty()
  tempHigh: Decimal;

  @ApiProperty()
  phLow: Decimal;

  @ApiProperty()
  phHigh: Decimal;

  @ApiProperty()
  tdoLow: Decimal;

  @ApiProperty()
  tdoHigh: Decimal;

  @ApiProperty()
  tdsLow: Decimal;

  @ApiProperty()
  tdsHigh: Decimal;

  @ApiProperty()
  turbiditiesLow: Decimal;

  @ApiProperty()
  turbiditiesHigh: Decimal;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  masterId: string;

  @ApiProperty()
  pond: PondEntity;
}
