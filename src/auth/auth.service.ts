import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as admin from 'firebase-admin';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async loginFirebase(uid: string) {
    try {
      const user = await admin.auth().getUser(uid);
      const { email, displayName: name, photoURL: photo } = user;
      const id = randomBytes(5).toString('hex');
      const token = randomBytes(30).toString('hex');
      return await this.prisma.user.upsert({
        where: {
          uid,
        },
        create: {
          id,
          email,
          uid,
          name,
          photo,
          token,
        },
        update: {
          token,
        },
      });
    } catch (error) {
      throw new UnauthorizedException('wrong credential');
    }
  }

  async logout(id: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { token: '' },
    });
  }

  async authenticate(uid: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        uid,
      },
    });

    if (user) {
      return await this.createToken(user.id);
    }
    const newUser = await this.register(uid);
    return await this.createToken(newUser.id);
  }

  private async register(uid: string) {
    try {
      const user = await admin.auth().getUser(uid);
      const { email, displayName: name, photoURL: photo } = user;
      const id = randomBytes(5).toString('hex');
      return await this.prisma.user.create({
        data: {
          id,
          email,
          uid,
          name,
          photo,
        },
      });
    } catch (error) {
      throw new UnauthorizedException('wrong credential');
    }
  }

  private async createToken(userId: string) {
    const token = randomBytes(30).toString('hex');
    const id = `TOK${randomBytes(5).toString('hex')}`;

    return await this.prisma.token.create({
      data: {
        id,
        userId,
        token,
      },
    });
  }

  async logoutV2(token: string) {
    return await this.prisma.token.deleteMany({
      where: {
        token,
      },
    });
  }
}
