import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MastersModule } from './masters/masters.module';
import { DevicesModule } from './devices/devices.module';
import { PondsModule } from './ponds/ponds.module';
import { UsersModule } from './users/users.module';
import { MetricsModule } from './metrics/metrics.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    AuthModule,
    ArticlesModule,
    NotificationsModule,
    MastersModule,
    DevicesModule,
    PondsModule,
    UsersModule,
    MetricsModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
