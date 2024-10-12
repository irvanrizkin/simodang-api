import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { AdminLogController } from './admin.log.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LogService],
  controllers: [AdminLogController],
})
export class LogModule {}
