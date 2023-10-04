import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
