import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PondsService } from './ponds.service';
import { CreatePondDto } from './dto/create-pond.dto';
import { UpdatePondDto } from './dto/update-pond.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('ponds')
@ApiTags('ponds')
export class PondsController {
  constructor(private readonly pondsService: PondsService) {}

  @Post()
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  create(@Request() req, @Body() createPondDto: CreatePondDto) {
    const { id: userId } = req.user;

    return this.pondsService.create(createPondDto, userId);
  }

  @Get()
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  findAllByUser(@Request() req) {
    const { id } = req.user;

    return this.pondsService.findAllByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pondsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePondDto: UpdatePondDto,
  ) {
    const { id: userId } = req.user;

    return this.pondsService.update(id, updatePondDto, userId);
  }

  @Patch(':id/device')
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  updateDeviceProperties(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePondDto: UpdatePondDto,
  ) {
    const { id: userId } = req.user;

    return this.pondsService.updateDeviceProperties(id, updatePondDto, userId);
  }
}
