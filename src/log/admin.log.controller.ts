import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guard/admin.guard';
import { TokenGuard } from 'src/guard/token.guard';
import { LogService } from './log.service';

@Controller('admin/log')
@UseGuards(TokenGuard, AdminGuard)
export class AdminLogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  findAll() {
    return this.logService.findAll();
  }
}
