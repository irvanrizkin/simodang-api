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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { UpdatePondPropDto } from './dto/update-pond-prop.dto';
import { PondErrorExample } from 'src/errors/examples/pond-error-example';
import { PondEntity } from './entities/pond.entity';

@Controller('ponds')
@UseGuards(TokenGuard)
@ApiTags('ponds')
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
export class PondsController {
  constructor(private readonly pondsService: PondsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created',
    type: PondEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/json': {
        examples: {
          badRequest: { value: PondErrorExample.badRequest },
        },
      },
    },
  })
  create(@Request() req, @Body() createPondDto: CreatePondDto) {
    const { id: userId } = req.user;

    return this.pondsService.create(createPondDto, userId);
  }

  @Get()
  @ApiOkResponse({
    description: 'OK',
    type: PondEntity,
    isArray: true,
  })
  findAllByUser(@Request() req) {
    const { id } = req.user;

    return this.pondsService.findAllByUser(id);
  }

  @Get(':id')
  @ApiNotFoundResponse({
    description: 'Not Found',
    content: {
      'application/json': {
        examples: {
          pondNotFound: { value: PondErrorExample.notFound },
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'OK',
    type: PondEntity,
  })
  findOne(@Param('id') id: string) {
    return this.pondsService.findOne(id);
  }

  @Patch(':id')
  @ApiNotFoundResponse({
    description: 'Not Found',
    content: {
      'application/json': {
        examples: {
          pondNotFound: { value: PondErrorExample.notFound },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    content: {
      'application/json': {
        examples: {
          notYours: { value: PondErrorExample.notYours },
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'OK',
    type: PondEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/json': {
        examples: {
          badRequest: { value: PondErrorExample.badRequest },
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
  @ApiNotFoundResponse({
    description: 'Not Found',
    content: {
      'application/json': {
        examples: {
          pondNotFound: { value: PondErrorExample.notFound },
          noDevice: { value: PondErrorExample.noDevice },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    content: {
      'application/json': {
        examples: {
          notYours: { value: PondErrorExample.notYours },
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
