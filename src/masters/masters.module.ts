import { Module } from '@nestjs/common';
import { MastersService } from './masters.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminMastersController } from './admin.masters.controller';

@Module({
  controllers: [AdminMastersController],
  providers: [MastersService, PrismaService],
})
export class MastersModule {}
