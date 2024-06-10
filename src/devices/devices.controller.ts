import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { TokenGuard } from 'src/guard/token.guard';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { DeviceEntity } from './entities/device.entity';
import { DevicePondEntity } from './entities/device-pond.entity';
import { DeviceErrorExample } from 'src/errors/examples/device-error-example';

@Controller('devices')
@ApiTags('devices')
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
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  @ApiOkResponse({
    description: 'OK',
    type: DeviceEntity,
    isArray: true,
  })
  findAllByUser(@Request() req) {
    const { id } = req.user;

    return this.devicesService.findAllByUser(id);
  }

  @Get('/v2')
  findAllByUserWithPond(@Request() req) {
    const { id } = req.user;

    return this.devicesService.findAllByUserWithPond(id);
  }

  @Get(':deviceId')
  @ApiOkResponse({
    description: 'OK',
    type: DevicePondEntity,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    content: {
      'application/json': {
        examples: {
          deviceNotFound: { value: DeviceErrorExample.notFound },
        },
      },
    },
  })
  findOne(@Param('deviceId') id: string) {
    return this.devicesService.findOne(id);
  }
}
