import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { TransactionsService } from 'src/transactions/transactions.service';
import { PricingPlanService } from 'src/pricing-plan/pricing-plan.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UpdateSubscriptionEvent } from './event/update-subscription.event';
import { CreateLogEvent } from 'src/log/event/create-log.event';
import { SubscriptionDisableFreeEvent } from './event/subscription-disable-free.event';

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

  async createFreeSubscription(user: UserEntity) {
    const freePlan = await this.pricingPlanService.findFreePlan();
    const { duration = 0 } = freePlan;

    return await this.create({
      userId: user.id,
      pricingPlanId: freePlan.id,
      expiredAt: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
      status: 1,
      isPaid: false,
    });
  }

  async buySubscription({
    pricingPlanId,
    user,
  }: {
    pricingPlanId: string;
    user: UserEntity;
  }) {
    // Check if user already have subscription
    const userSubscription = await this.getPaidSubscriptions(user.id);
    if (userSubscription) {
      throw new ConflictException('User already have paid subscription');
    }

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
      isPaid: true,
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

  /**
   * Get any paid subscription
   * Used to ensure user not create double paid subscription
   * @param userId
   * @returns
   */
  async getPaidSubscriptions(userId: string) {
    return await this.prisma.subscription.findFirst({
      where: {
        userId,
        expiredAt: {
          gte: new Date(),
        },
        isPaid: true,
        status: 1,
      },
      include: {
        pricingPlan: true,
      },
    });
  }

  /**
   * Get any active subscription
   * Used for pond limit checking
   * @param userId
   */
  async getActiveSubscription(userId: string) {
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
    const userSubscription = await this.getActiveSubscription(userId);
    return userSubscription?.pricingPlan?.pondLimit ?? 0;
  }

  getCustomerDetailFromUser(user: UserEntity) {
    return {
      first_name: user.name || null,
      email: user.email,
      phone: user.phoneNum || null,
    };
  }

  @OnEvent('subscription.disable.free', { async: true })
  async disableFreeSubscriptions(
    subscriptionDisableFreeEvent: SubscriptionDisableFreeEvent,
  ) {
    await this.prisma.subscription.updateMany({
      where: {
        userId: subscriptionDisableFreeEvent.userId,
        isPaid: false,
      },
      data: {
        status: 0,
      },
    });
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
