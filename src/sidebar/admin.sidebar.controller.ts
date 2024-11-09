import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SidebarService } from './sidebar.service';
import { TokenGuard } from 'src/guard/token.guard';
import { AdminGuard } from 'src/guard/admin.guard';
import { CreateSidebarDto } from './dto/create_sidebar.dto';
import { UserGuard } from 'src/guard/user.guard';

@Controller('admin/sidebar')
@UseGuards(TokenGuard, UserGuard, AdminGuard)
@ApiTags('admin/sidebar')
@ApiBearerAuth()
export class AdminSidebarController {
  constructor(private readonly sidebarService: SidebarService) {}

  @Post()
  create(@Body() createSidebarDto: CreateSidebarDto) {
    return this.sidebarService.create(createSidebarDto);
  }
}
