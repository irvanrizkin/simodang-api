import { Module } from '@nestjs/common';
import { PondsService } from './ponds.service';
import { PondsController } from './ponds.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminPondsController } from './admin.ponds.controller';

@Module({
  controllers: [PondsController, AdminPondsController],
  providers: [PondsService, PrismaService],
})
export class PondsModule {}
