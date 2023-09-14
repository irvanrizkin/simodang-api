import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as admin from 'firebase-admin';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async loginFirebase(uid: string) {
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
  }
}
