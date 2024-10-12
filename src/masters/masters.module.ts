import { Module } from '@nestjs/common';
import { MastersService } from './masters.service';
import { AdminMastersController } from './admin.masters.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminMastersController],
  providers: [MastersService],
})
export class MastersModule {}
