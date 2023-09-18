import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreatePondDto } from './dto/create-pond.dto';
import { UpdatePondDto } from './dto/update-pond.dto';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    const { name, address, city, deviceId, imageUrl, isFilled, seedDate } =
      updatePondDto;
    const pond = await this.findOne(id);

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
      },
    });
  }

  async updateDeviceProperties(
    id: string,
    updatePondDto: UpdatePondDto,
    userId: string,
  ) {
    const {
      notificationEnabled,
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
    } = updatePondDto;
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

    return await this.prisma.pond.update({
      where: { id },
      data: {
        device: {
          update: {
            data: {
              notificationEnabled,
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
  }
}
