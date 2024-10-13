import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLogEvent } from './event/create-log.event';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  private async create(scope: string, summary: string) {
    return await this.prisma.log.create({
      data: {
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
