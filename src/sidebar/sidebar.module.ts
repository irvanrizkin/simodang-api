import { Module } from '@nestjs/common';
import { SidebarService } from './sidebar.service';
import { SidebarController } from './sidebar.controller';
import { AdminSidebarController } from './admin.sidebar.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SidebarService],
  controllers: [SidebarController, AdminSidebarController],
})
export class SidebarModule {}
