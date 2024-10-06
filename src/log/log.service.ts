import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLogEvent } from './event/create-log.event';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  async create(scope: string, summary: string) {
    const id = `LOG${randomBytes(5).toString('hex')}`;

    return await this.prisma.log.create({
      data: {
        id,
        scope,
        summary,
      },
    });
  }

  @OnEvent('log.create')
  async createLogEvent({ scope, summary }: CreateLogEvent) {
    return await this.create(scope, summary);
  }

  async findAll() {
    return await this.prisma.log.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
