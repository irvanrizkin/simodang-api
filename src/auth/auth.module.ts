import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, SubscriptionModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
