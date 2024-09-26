import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
	constructor(private prisma: PrismaService) {}

	async create(createSubscriptionDto: CreateSubscriptionDto) {
		return await this.prisma.subscription.create({
			data: createSubscriptionDto,
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
}
