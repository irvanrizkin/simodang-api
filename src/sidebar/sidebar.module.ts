import { Module } from '@nestjs/common';
import { SidebarService } from './sidebar.service';
import { SidebarController } from './sidebar.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminSidebarController } from './admin.sidebar.controller';

@Module({
  providers: [SidebarService, PrismaService],
  controllers: [SidebarController, AdminSidebarController],
})
export class SidebarModule {}
