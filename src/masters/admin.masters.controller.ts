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
import { MasterErrorExample } from 'src/errors/examples/master-error.example';
import { MasterEntity } from './entities/master.entity';

@Controller('admin/masters')
@UseGuards(TokenGuard, AdminGuard)
@ApiTags('admin/masters')
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
        notAdmin: { value: GuardErrorExample.notAdmin },
      },
    },
  },
})
export class AdminMastersController {
  constructor(private readonly mastersService: MastersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created',
    type: MasterEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/json': {
        examples: {
          badRequest: { value: MasterErrorExample.badRequest },
        },
      },
    },
  })
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.mastersService.create(createMasterDto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'OK',
    type: MasterEntity,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    content: {
      'application/json': {
        examples: {
          masterNotFound: { value: MasterErrorExample.notFound },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/json': {
        examples: {
          badRequest: { value: MasterErrorExample.badRequest },
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.mastersService.update(id, updateMasterDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'OK',
    type: MasterEntity,
    isArray: true,
  })
  findAll() {
    return this.mastersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'OK',
    type: MasterEntity,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    content: {
      'application/json': {
        examples: {
          masterNotFound: { value: MasterErrorExample.notFound },
        },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.mastersService.findOne(id);
  }
}
