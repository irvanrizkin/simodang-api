import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { UpdateTransactionThirdPartyDto } from './dto/update-transaction-thirdparty.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import { TokenGuard } from 'src/guard/token.guard';

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

  @Get()
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  getAllTransactionByUser(@Request() req) {
    const user: UserEntity = req?.user ?? null;
    return this.transactionsService.getAllTransactionsByUser(user?.id ?? '');
  }
}
