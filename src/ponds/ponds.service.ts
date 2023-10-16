import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreatePondDto } from './dto/create-pond.dto';
import { UpdatePondDto } from './dto/update-pond.dto';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePondPropDto } from './dto/update-pond-prop.dto';

@Injectable()
export class PondsService {
  constructor(private prisma: PrismaService) {}

  async create(createPondDto: CreatePondDto, userId: string) {
    const { name, address, city, deviceId, imageUrl, isFilled } = createPondDto;
    const id = `PON${randomBytes(5).toString('hex')}`;

    return await this.prisma.pond.create({
      data: {
        id,
        name,
        address,
        city,
        deviceId,
        imageUrl,
        isFilled,
        userId,
      },
    });
  }

  async findAll() {
    return this.prisma.pond.findMany();
  }

  async findAllByUser(userId: string) {
    return this.prisma.pond.findMany({
      where: { userId },
    });
  }

  async findOne(id: string) {
    const pond = await this.prisma.pond.findUnique({
      where: { id },
      include: { device: true },
    });

    if (!pond) {
      throw new NotFoundException('pond not found');
    }

    return pond;
  }

  async update(id: string, updatePondDto: UpdatePondDto, userId: string) {
    const {
      name,
      address,
      city,
      deviceId,
      imageUrl,
      isFilled,
      seedDate: date,
      seedCount,
    } = updatePondDto;
    const pond = await this.findOne(id);
    const seedDate = new Date(date);

    if (!pond) {
      throw new NotFoundException('pond not found');
    }

    if (userId !== pond.userId) {
      throw new ForbiddenException('this pond not yours');
    }

    return await this.prisma.pond.update({
      where: { id },
      data: {
        name,
        address,
        city,
        deviceId,
        imageUrl,
        isFilled,
        seedDate,
        seedCount,
      },
    });
  }

  async updateDeviceProperties(
    id: string,
    updatePondPropDto: UpdatePondPropDto,
    userId: string,
  ) {
    const {
      notificationEnabled,
      autoWaterEnabled,
      autoFeedEnabled,
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
    } = updatePondPropDto;
    const pond = await this.findOne(id);

    if (!pond) {
      throw new NotFoundException('pond not found');
    }

    if (userId !== pond.userId) {
      throw new ForbiddenException('this pond not yours');
    }

    if (!pond.deviceId) {
      throw new NotFoundException('no device attached in this pond');
    }

    const pondDevice = await this.prisma.pond.update({
      where: { id },
      data: {
        device: {
          update: {
            data: {
              notificationEnabled,
              autoWaterEnabled,
              autoFeedEnabled,
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
          },
        },
      },
      include: {
        device: true,
      },
    });

    await this.prisma.pond.update({
      where: { id },
      data: {
        device: {
          update: {
            data: {
              isChanged: true,
            },
          },
        },
      },
      include: {
        device: true,
      },
    });

    return pondDevice;
  }
}
