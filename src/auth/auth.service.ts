import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as admin from 'firebase-admin';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private subscriptionService: SubscriptionService,
  ) {}

  async authenticate(uid: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        uid,
      },
    });

    if (user) return user;
    const newUser = await this.register(uid);

    await this.subscriptionService.createFreeSubscription(newUser);

    return user;
  }

  private async register(uid: string) {
    try {
      const user = await admin.auth().getUser(uid);
      const { email, displayName: name, photoURL: photo } = user;
      return await this.prisma.user.create({
        data: {
          email,
          uid,
          name,
          photo,
        },
      });
    } catch (error) {
      throw new UnauthorizedException('user not exist at firebase');
    }
  }
}
