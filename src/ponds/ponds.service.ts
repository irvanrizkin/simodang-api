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
    const id = `PON${randomBytes(5).toString('hex')}`;
    const { deviceId: deviceIdStr } = createPondDto;

    let deviceId = deviceIdStr;

    if (!deviceId) {
      deviceId = null;
    }

    return await this.prisma.pond.create({
      data: {
        ...createPondDto,
        id,
        userId,
        deviceId,
      },
    });
  }

  async findAll() {
    return this.prisma.pond.findMany();
  }

  async findAllByUser(userId: string) {
    return this.prisma.pond.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
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
    const { isFilled, seedDate: date, deviceId: deviceIdStr } = updatePondDto;
    const pond = await this.findOne(id);
    const dateObj = new Date(date);
    const seedDate =
      dateObj.toString() === 'Invalid Date' ? undefined : dateObj;

    let deviceId = deviceIdStr;

    if (!deviceId) {
      deviceId = null;
    }

    if (!pond) {
      throw new NotFoundException('pond not found');
    }

    if (userId !== pond.userId) {
      throw new ForbiddenException('this pond not yours');
    }

    return await this.prisma.pond.update({
      where: { id },
      data: {
        ...updatePondDto,
        isFilled,
        seedDate,
        deviceId,
      },
    });
  }

  async updateDeviceProperties(
    id: string,
    updatePondPropDto: UpdatePondPropDto,
    userId: string,
  ) {
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
            data: updatePondPropDto,
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

  async remove(id: string) {
    const pond = await this.prisma.pond.findUnique({
      where: { id },
      include: { device: true },
    });

    if (!pond) {
      throw new NotFoundException('pond not found');
    }

    return await this.prisma.pond.delete({
      where: { id },
    });
  }
}
