import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  async create(createDeviceDto: CreateDeviceDto) {
    const { id, name, userId, masterId } = createDeviceDto;

    return await this.prisma.device.create({
      data: {
        id,
        name,
        userId,
        masterId,
      },
    });
  }

  async findAll() {
    return await this.prisma.device.findMany();
  }

  async findAllByUser(userId: string) {
    return await this.prisma.device.findMany({
      where: { userId },
    });
  }

  async findOne(id: string) {
    return await this.prisma.device.findUnique({
      where: { id },
      include: { pond: true },
    });
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    const {
      name,
      userId,
      masterId,
      notificationEnabled,
      isSaved,
      tempLow,
      tempHigh,
      phLow,
      phHigh,
      tdoLow,
      tdoHigh,
      tdsLow,
      tdsHigh,
      turbiditiesLow,
      turbiditiesHigh,
    } = updateDeviceDto;

    return await this.prisma.device.update({
      where: { id },
      data: {
        name,
        userId,
        masterId,
        notificationEnabled,
        isSaved,
        tempLow,
        tempHigh,
        phLow,
        phHigh,
        tdoLow,
        tdoHigh,
        tdsLow,
        tdsHigh,
        turbiditiesLow,
        turbiditiesHigh,
      },
    });
  }
}
