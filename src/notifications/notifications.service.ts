import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createNotificationDto: CreateNotificationDto) {
    const { title, message } = createNotificationDto;
    const id = `NOT${randomBytes(5).toString('hex')}`;

    return await this.prisma.notification.create({
      data: {
        id,
        title,
        message,
        userId,
      },
    });
  }

  async findAllByToken(userId: string) {
    return await this.prisma.notification.findMany({
      where: { userId, deleted: 0 },
    });
  }

  async deleteAllByToken(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId },
      data: { deleted: 1 },
    });
  }
}
