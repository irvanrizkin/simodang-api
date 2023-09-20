import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  @UseGuards(TokenGuard)
  findAllByUser(@Request() req) {
    const { id } = req.user;

    return this.devicesService.findAllByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(id);
  }
}
