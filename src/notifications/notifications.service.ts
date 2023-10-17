import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createNotificationDto: CreateNotificationDto) {
    const id = `NOT${randomBytes(5).toString('hex')}`;

    return await this.prisma.notification.create({
      data: {
        id,
        userId,
        ...createNotificationDto,
      },
    });
  }

  async findAllByToken(userId: string) {
    return await this.prisma.notification.findMany({
      where: { userId, deleted: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteAllByToken(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId },
      data: { deleted: true },
    });
  }

  async updateIsRead(id: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('notification not found');
    }

    if (notification.userId !== userId) {
      throw new ForbiddenException('this notification not yours');
    }

    return await this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
