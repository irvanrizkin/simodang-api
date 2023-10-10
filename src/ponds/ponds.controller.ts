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
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { UpdatePondPropDto } from './dto/update-pond-prop.dto';

@Controller('ponds')
@ApiTags('ponds')
export class PondsController {
  constructor(private readonly pondsService: PondsService) {}

  @Post()
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    content: {
      'application/json': {
        examples: {
          noToken: { value: GuardErrorExample.noToken },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    content: {
      'application/json': {
        examples: {
          tokenMismatch: { value: GuardErrorExample.tokenMismatch },
        },
      },
    },
  })
  create(@Request() req, @Body() createPondDto: CreatePondDto) {
    const { id: userId } = req.user;

    return this.pondsService.create(createPondDto, userId);
  }

  @Get()
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    content: {
      'application/json': {
        examples: {
          noToken: { value: GuardErrorExample.noToken },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    content: {
      'application/json': {
        examples: {
          tokenMismatch: { value: GuardErrorExample.tokenMismatch },
        },
      },
    },
  })
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
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    content: {
      'application/json': {
        examples: {
          noToken: { value: GuardErrorExample.noToken },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    content: {
      'application/json': {
        examples: {
          tokenMismatch: { value: GuardErrorExample.tokenMismatch },
        },
      },
    },
  })
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
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    content: {
      'application/json': {
        examples: {
          noToken: { value: GuardErrorExample.noToken },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    content: {
      'application/json': {
        examples: {
          tokenMismatch: { value: GuardErrorExample.tokenMismatch },
        },
      },
    },
  })
  updateDeviceProperties(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePondPropDto: UpdatePondPropDto,
  ) {
    const { id: userId } = req.user;

    return this.pondsService.updateDeviceProperties(
      id,
      updatePondPropDto,
      userId,
    );
  }
}
