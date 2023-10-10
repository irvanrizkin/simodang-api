import {
  Controller,
  Get,
  Delete,
  UseGuards,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { TokenGuard } from 'src/guard/token.guard';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { NotificationErrorExample } from 'src/errors/examples/notification-error-example';

@Controller('notifications')
@UseGuards(TokenGuard)
@ApiTags('notifications')
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
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async findAllByToken(@Request() req) {
    const { id: userId } = req.user;

    return this.notificationsService.findAllByToken(userId);
  }

  @Delete()
  async deleteAllByToken(@Request() req) {
    const { id: userId } = req.user;

    await this.notificationsService.deleteAllByToken(userId);

    return {
      message: 'all notifications from this user was deleted successfully',
    };
  }

  @Patch('/:id')
  @ApiNotFoundResponse({
    description: 'Not Found',
    content: {
      'application/json': {
        examples: {
          masterNotFound: { value: NotificationErrorExample.notFound },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    content: {
      'application/json': {
        examples: {
          notYours: { value: NotificationErrorExample.notOwned },
        },
      },
    },
  })
  async updateIsRead(@Param('id') id: string, @Request() req) {
    const { id: userId } = req.user;

    return this.notificationsService.updateIsRead(id, userId);
  }
}
