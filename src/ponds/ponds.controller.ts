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

@Controller('ponds')
export class PondsController {
  constructor(private readonly pondsService: PondsService) {}

  @Post()
  @UseGuards(TokenGuard)
  create(@Request() req, @Body() createPondDto: CreatePondDto) {
    const { id: userId } = req.user;

    return this.pondsService.create(createPondDto, userId);
  }

  @Get()
  findAll() {
    return this.pondsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pondsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TokenGuard)
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePondDto: UpdatePondDto,
  ) {
    const { id: userId } = req.user;

    return this.pondsService.update(id, updatePondDto, userId);
  }
}
