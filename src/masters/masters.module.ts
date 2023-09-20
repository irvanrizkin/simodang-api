import { Module } from '@nestjs/common';
import { MastersService } from './masters.service';
import { MastersController } from './masters.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminMastersController } from './admin.masters.controller';

@Module({
  controllers: [MastersController, AdminMastersController],
  providers: [MastersService, PrismaService],
})
export class MastersModule {}
