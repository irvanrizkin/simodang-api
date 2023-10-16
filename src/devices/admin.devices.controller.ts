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
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { DeviceErrorExample } from 'src/errors/examples/device-error-example';
import { DeviceEntity } from './entities/device.entity';

@Controller('admin/devices')
@UseGuards(TokenGuard, AdminGuard)
@ApiTags('admin/devices')
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
export class AdminDevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiOkResponse({
    description: 'OK',
    type: DeviceEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/json': {
        examples: {
          badRequest: { value: DeviceErrorExample.badRequest },
        },
      },
    },
  })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Patch(':id')
  @ApiNotFoundResponse({
    description: 'Not Found',
    content: {
      'application/json': {
        examples: {
          notFound: { value: DeviceErrorExample.notFound },
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'OK',
    type: DeviceEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/json': {
        examples: {
          badRequest: { value: DeviceErrorExample.badRequestUpdate },
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(id, updateDeviceDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'OK',
    type: DeviceEntity,
    isArray: true,
  })
  findAll() {
    return this.devicesService.findAll();
  }
}
