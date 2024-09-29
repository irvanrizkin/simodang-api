import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { isAxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
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
}
