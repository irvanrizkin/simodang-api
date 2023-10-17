import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MastersService {
  constructor(private prisma: PrismaService) {}

  async create(createMasterDto: CreateMasterDto) {
    return await this.prisma.master.create({
      data: createMasterDto,
    });
  }

  async findAll() {
    return await this.prisma.master.findMany();
  }

  async findOne(id: string) {
    const master = await this.prisma.master.findUnique({
      where: { id },
    });

    if (!master) {
      throw new NotFoundException('master not found');
    }

    return master;
  }

  async update(id: string, updateMasterDto: UpdateMasterDto) {
    const isExist = this.isMasterExist(id);

    if (!isExist) {
      throw new NotFoundException('master not found');
    }

    return await this.prisma.master.update({
      where: { id },
      data: updateMasterDto,
    });
  }

  private async isMasterExist(id: string) {
    const master = await this.prisma.master.findUnique({
      where: { id },
    });

    return !!master;
  }
}
