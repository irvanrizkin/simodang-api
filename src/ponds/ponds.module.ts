import { Module } from '@nestjs/common';
import { PondsService } from './ponds.service';
import { PondsController } from './ponds.controller';
import { AdminPondsController } from './admin.ponds.controller';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, SubscriptionModule],
  controllers: [PondsController, AdminPondsController],
  providers: [PondsService],
})
export class PondsModule {}
