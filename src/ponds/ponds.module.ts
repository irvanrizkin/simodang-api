import { Module } from '@nestjs/common';
import { PondsService } from './ponds.service';
import { PondsController } from './ponds.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PondsController],
  providers: [PondsService, PrismaService],
})
export class PondsModule {}
