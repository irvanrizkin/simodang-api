import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guard/admin.guard';
import { TokenGuard } from 'src/guard/token.guard';
import { LogService } from './log.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('admin/log')
@UseGuards(TokenGuard, AdminGuard)
@ApiTags('admin/log')
@ApiBearerAuth()
export class AdminLogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  findAll() {
    return this.logService.findAll();
  }
}
