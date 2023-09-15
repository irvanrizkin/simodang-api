import { Module } from '@nestjs/common';
import { MastersService } from './masters.service';
import { MastersController } from './masters.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MastersController],
  providers: [MastersService, PrismaService],
})
export class MastersModule {}
