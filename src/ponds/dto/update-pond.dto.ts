import { PartialType } from '@nestjs/mapped-types';
import { CreatePondDto } from './create-pond.dto';

export class UpdatePondDto extends PartialType(CreatePondDto) {
  seedDate?: string;
  notificationEnabled?: number;
  autoWaterEnabled?: number;
  autoFeedEnabled?: number;
  isSaved?: number;
  tempLow?: number;
  tempHigh?: number;
  phLow?: number;
  phHigh?: number;
  tdoLow?: number;
  tdoHigh?: number;
  tdsLow?: number;
  tdsHigh?: number;
  turbiditiesLow?: number;
  turbiditiesHigh?: number;
}
