import { Controller, Get, Param } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeviceErrorExample } from 'src/errors/examples/device-error-example';
import { DevicePondEntity } from './entities/device-pond.entity';

@Controller('iot/devices')
@ApiTags('iot/')
export class IotDevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get(':deviceId')
  @ApiTags('iot/devices')
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
