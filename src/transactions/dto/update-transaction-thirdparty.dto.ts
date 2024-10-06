import { IsString } from 'class-validator';

export class UpdateTransactionThirdPartyDto {
  @IsString()
  order_id: string;
}
