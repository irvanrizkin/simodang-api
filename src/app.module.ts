import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MastersModule } from './masters/masters.module';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ArticlesModule, NotificationsModule, MastersModule, DevicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
