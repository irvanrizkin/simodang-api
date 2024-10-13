import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SidebarService } from './sidebar.service';

@Controller('sidebar')
@ApiTags('sidebar')
export class SidebarController {
  constructor(private readonly sidebarService: SidebarService) {}

  @Get()
  findAll() {
    return this.sidebarService.findAll();
  }
}
