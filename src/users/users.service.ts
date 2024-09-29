import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './update-user.dto';
import { AdminUpdateUserDto } from './admin-update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updateAdmin(id: string, adminUpdateUserDto: AdminUpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: adminUpdateUserDto,
    });
  }

  generateCustomerDetails(user: UserEntity) {
    return {
      first_name: user.name || null,
      email: user.email,
      phone: user.phoneNum || null,
    };
  }
}
