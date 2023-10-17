import { ApiProperty } from '@nestjs/swagger';
import { Notification } from '@prisma/client';

export class NotificationEntity implements Notification {
  @ApiProperty({
    description: 'Notification id for identifier, automatically generated.',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the notification. Usually in bold',
  })
  title: string;

  @ApiProperty({
    description: 'Content of the notification.',
  })
  message: string;

  @ApiProperty({
    description: 'If true, the notification will be hidden from user.',
  })
  deleted: boolean;

  @ApiProperty({
    description: 'If true, the notification has been read by user.',
  })
  isRead: boolean;

  @ApiProperty({
    description: 'Date when the notification is created. In ISO format.',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'To determine the owner of the notification.',
  })
  userId: string;
}
