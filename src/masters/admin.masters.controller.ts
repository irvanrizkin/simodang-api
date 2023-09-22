import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guard/admin.guard';
import { TokenGuard } from 'src/guard/token.guard';
import { MastersService } from './masters.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';

@Controller('admin/masters')
@UseGuards(TokenGuard, AdminGuard)
export class AdminMastersController {
  constructor(private readonly mastersService: MastersService) {}

  @Post()
  @UseGuards(TokenGuard, AdminGuard)
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.mastersService.create(createMasterDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.mastersService.update(id, updateMasterDto);
  }

  @Get()
  findAll() {
    return this.mastersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mastersService.findOne(id);
  }
}
