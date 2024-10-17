import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { isAxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubscriptionDisableFreeEvent } from 'src/subscription/event/subscription-disable-free.event';
import { UpdateSubscriptionEvent } from 'src/subscription/event/update-subscription.event';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private eventEmitter: EventEmitter2,
  ) {}

  async createPaymentLink({
    transaction_details,
    item_details,
    customer_details,
    expiry,
  }: {
    transaction_details: {
      order_id: string;
      gross_amount: number;
    };
    item_details: {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }[];
    customer_details: {
      first_name: string;
      email: string;
      phone: string;
    };
    expiry: {
      duration: number;
      unit: 'days' | 'hours' | 'minutes';
    };
  }) {
    try {
      return await firstValueFrom(
        this.httpService.post('/v1/payment-links', {
          transaction_details,
          item_details,
          customer_details,
          expiry,
        }),
      );
    } catch (error) {
      if (isAxiosError(error)) {
        throw new InternalServerErrorException(error.response?.data);
      }
      throw new InternalServerErrorException('Failed to create payment link');
    }
  }

  async createTransaction({
    userId,
    subscriptionId,
    price,
    expiredAt,
  }: {
    userId: string;
    subscriptionId: string;
    price: number;
    expiredAt: Date;
  }) {
    return await this.prisma.transaction.create({
      data: {
        userId,
        subscriptionId,
        amount: price,
        status: 2,
        paymentLink: '',
        expiredAt,
      },
    });
  }

  async getTransaction(transactionId: string) {
    return await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
  }

  async getTransactionWithPricingPlan(transactionId: string) {
    return await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        subscription: {
          include: {
            pricingPlan: true,
          },
        },
      },
    });
  }

  async updateTransactionThirdParty({ orderId }: { orderId: string }) {
    if (!orderId) {
      throw new BadRequestException('Order ID is required');
    }
    const orderIdSplit = orderId.split('-')[0];

    const transaction = await this.getTransaction(orderIdSplit);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if ([0, 1].includes(transaction.status)) {
      throw new InternalServerErrorException('Transaction already processed');
    }

    const response = await this.verifyTransaction(orderId);
    const transactionStatus = response.data?.transaction_status || null;

    if (['settlement', 'capture'].includes(transactionStatus)) {
      const transaction = await this.prisma.transaction.update({
        where: {
          id: orderIdSplit,
        },
        data: {
          status: 1,
        },
      });
      this.eventEmitter.emit(
        'subscription.update',
        new UpdateSubscriptionEvent(transaction.subscriptionId, 1),
      );
      this.eventEmitter.emit(
        'subscription.disable.free',
        new SubscriptionDisableFreeEvent(transaction.userId),
      );
      return transaction;
    }

    if (['cancel', 'deny', 'expire'].includes(transactionStatus)) {
      const transaction = await this.prisma.transaction.update({
        where: {
          id: orderIdSplit,
        },
        data: {
          status: 0,
        },
      });
      this.eventEmitter.emit(
        'subscription.update',
        new UpdateSubscriptionEvent(transaction.subscriptionId, 0),
      );
      return transaction;
    }

    throw new InternalServerErrorException('Transaction failed');
  }

  async verifyTransaction(orderId: string) {
    try {
      return await firstValueFrom(
        this.httpService.get(`/v2/${orderId}/status`),
      );
    } catch (error) {
      if (isAxiosError(error)) {
        throw new InternalServerErrorException(error.response?.data);
      }
      throw new InternalServerErrorException('Failed to verify transaction');
    }
  }

  async getAllTransactionsByUser(userId: string) {
    return await this.prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        subscription: {
          include: {
            pricingPlan: true,
          },
        },
      },
    });
  }
}
