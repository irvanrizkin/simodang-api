import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreatePondDto } from './dto/create-pond.dto';
import { UpdatePondDto } from './dto/update-pond.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePondPropDto } from './dto/update-pond-prop.dto';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Injectable()
export class PondsService {
  constructor(
    private prisma: PrismaService,
    private subscriptionService: SubscriptionService,
  ) {}

  async create(createPondDto: CreatePondDto, userId: string) {
    // deviceId will null if not provided, no device attached
    const { deviceId = null, imageUrl = 'https://placehold.co/600x400/png' } =
      createPondDto;

    const pondLimit = await this.subscriptionService.getPondLimit(userId);

    const ponds = await this.prisma.pond.findMany({
      where: { userId },
    });

    if (ponds.length >= pondLimit) {
      throw new ForbiddenException('you have reached pond limit');
    }

    return await this.prisma.pond.create({
      data: {
        ...createPondDto,
        imageUrl,
        userId,
        deviceId,
      },
    });
  }

  async findAll() {
    return this.prisma.pond.findMany();
  }

  async findAllByUser(userId: string) {
    const pondLimit = await this.subscriptionService.getPondLimit(userId);

    const ponds = await this.prisma.pond.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const enabledPonds = ponds.map((pond, index) => ({
      ...pond,
      isEnabled: index < pondLimit,
    }));

    return enabledPonds;
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
    // deviceId will undefined if not provided, no device changed
    const { isFilled, seedDate: date, deviceId } = updatePondDto;
    const pond = await this.findOne(id);
    const dateObj = new Date(date);
    const seedDate =
      dateObj.toString() === 'Invalid Date' ? undefined : dateObj;

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
