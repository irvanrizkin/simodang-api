import { Controller, Get, Delete, UseGuards, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { TokenGuard } from 'src/guard/token.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('notifications')
@UseGuards(TokenGuard)
@ApiTags('notifications')
@ApiBearerAuth()
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
}
