import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSidebarDto } from './dto/create_sidebar.dto';

@Injectable()
export class SidebarService {
  constructor(private prisma: PrismaService) {}

  async create(createSidebarDto: CreateSidebarDto) {
    return await this.prisma.sidebar.create({
      data: createSidebarDto,
    });
  }

  async findAll() {
    return await this.prisma.sidebar.findMany();
  }
}
