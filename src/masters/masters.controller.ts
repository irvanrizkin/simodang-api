import { Controller, Get, Param } from '@nestjs/common';
import { MastersService } from './masters.service';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { MasterErrorExample } from 'src/errors/examples/master-error.example';

@Controller('masters')
@ApiTags('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) {}

  @Get()
  findAll() {
    return this.mastersService.findAll();
  }

  @Get(':id')
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
