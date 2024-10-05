import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { TransactionsService } from 'src/transactions/transactions.service';
import { PricingPlanService } from 'src/pricing-plan/pricing-plan.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UpdateSubscriptionEvent } from './event/update-subscription.event';
import { CreateLogEvent } from 'src/log/event/create-log.event';

@Injectable()
export class SubscriptionService {
  constructor(
    private transactionsService: TransactionsService,
    private pricingPlanService: PricingPlanService,
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return await this.prisma.subscription.create({
      data: createSubscriptionDto,
    });
  }

  async buySubscription({
    pricingPlanId,
    user,
  }: {
    pricingPlanId: string;
    user: UserEntity;
  }) {
    // Step 1: Check pricing plan
    const pricingPlan = await this.pricingPlanService.findOne(pricingPlanId);
    if (!pricingPlan) {
      throw new NotFoundException('Pricing plan not found');
    }
    const { duration = 0, price = 0 } = pricingPlan;
    const item = this.pricingPlanService.generateMidtransItem(pricingPlan);

    // Step 2: Create subscription
    const subscription = await this.create({
      userId: user.id,
      pricingPlanId: pricingPlanId,
      expiredAt: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
      status: 0,
    });

    // Step 3: Create transaction
    const transaction = await this.transactionsService.createTransaction({
      userId: user.id,
      subscriptionId: subscription.id,
      price,
      expiredAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });

    // Step 4: Create payment link
    const customerDetails = this.getCustomerDetailFromUser(user);
    const paymentLink = await this.transactionsService.createPaymentLink({
      transaction_details: {
        order_id: transaction.id,
        gross_amount: price,
      },
      item_details: [item],
      customer_details: customerDetails,
      expiry: {
        duration: 1,
        unit: 'days',
      },
    });

    // Step 5: Update transaction with payment link
    return await this.prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        paymentLink: paymentLink.data.payment_url || '',
      },
    });
  }

  async checkFreeSubscriber(userId: string) {
    const userSubscription = await this.prisma.subscription.findFirst({
      where: {
        userId,
      },
    });
    if (userSubscription) {
      return false;
    }
    return true;
  }

  async getSubscription(userId: string) {
    return await this.prisma.subscription.findFirst({
      where: {
        userId,
        status: 1,
        expiredAt: {
          gte: new Date(),
        },
      },
      include: {
        pricingPlan: true,
      },
    });
  }

  async getPondLimit(userId: string) {
    const userSubscription = await this.getSubscription(userId);
    return userSubscription?.pricingPlan?.pondLimit ?? 0;
  }

  getCustomerDetailFromUser(user: UserEntity) {
    return {
      first_name: user.name || null,
      email: user.email,
      phone: user.phoneNum || null,
    };
  }

  @OnEvent('subscription.update', { async: true })
  async updateSubscription(updateSubscriptionEvent: UpdateSubscriptionEvent) {
    const { subscriptionId, status } = updateSubscriptionEvent;

    const subscription = await this.prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { pricingPlan: true },
    });
    const duration = subscription?.pricingPlan?.duration ?? 0;
    const pricingPlanId = subscription?.pricingPlan?.id ?? '';

    if (status === 1) {
      await this.prisma.subscription.update({
        where: { id: subscriptionId },
        data: {
          status,
          expiredAt: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
        },
      });
      this.eventEmitter.emit(
        'log.create',
        new CreateLogEvent(
          'subscription.update.active',
          `Subscription ID: ${subscriptionId}, Pricing: ${pricingPlanId} activated`,
        ),
      );
      return;
    }

    if (status === 2) {
      await this.prisma.subscription.update({
        where: { id: subscriptionId },
        data: {
          status,
        },
      });
      this.eventEmitter.emit(
        'log.create',
        new CreateLogEvent(
          'subscription.update.cancel',
          `Subscription ID: ${subscriptionId}, Pricing: ${pricingPlanId} canceled`,
        ),
      );
      return;
    }
    return;
  }
}
