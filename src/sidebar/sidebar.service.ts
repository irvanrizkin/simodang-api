import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SidebarService {
  constructor(private prisma: PrismaService) {}

  async create(createSidebarDto: any) {
    return await this.prisma.sidebar.create({
      data: createSidebarDto,
    });
  }

  async findAll() {
    return await this.prisma.sidebar.findMany();
  }
}
