import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { UpdateTransactionThirdPartyDto } from './dto/update-transaction-thirdparty.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('transactions')
@ApiTags('transaction')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post('/update-status')
  updateTransactionThirdParty(
    @Body() updateTransactionThirdPartyDto: UpdateTransactionThirdPartyDto,
  ) {
    const { order_id: orderId } = updateTransactionThirdPartyDto;
    if (!orderId) {
      throw new BadRequestException('Order ID is required');
    }

    return this.transactionsService.updateTransactionThirdParty({
      orderId,
    });
  }
}
