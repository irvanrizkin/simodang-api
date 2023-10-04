import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminLogController } from './admin.log.controller';

@Module({
  providers: [LogService, PrismaService],
  exports: [LogService],
  controllers: [AdminLogController],
})
export class LogModule {}
