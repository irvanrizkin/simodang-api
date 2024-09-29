import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('PAYMENT_GATEWAY_URL'),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: configService.get('PAYMENT_GATEWAY_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TransactionsService, PrismaService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
