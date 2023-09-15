import { Controller, Get, Delete, UseGuards, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(TokenGuard)
  async findAllByToken(@Request() req) {
    const { id: userId } = req.user;

    return this.notificationsService.findAllByToken(userId);
  }

  @Delete()
  @UseGuards(TokenGuard)
  async deleteAllByToken(@Request() req) {
    const { id: userId } = req.user;

    await this.notificationsService.deleteAllByToken(userId);

    return {
      message: 'all notifications from this user was deleted successfully',
    };
  }
}
