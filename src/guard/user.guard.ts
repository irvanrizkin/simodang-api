import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('please provide token');

    try {
      const uid = request['uid'] ?? null;
      if (!uid) throw new UnauthorizedException('uid not found');

      const user = await this.getUserByUid(uid);
      if (!user) throw new UnauthorizedException('user not found');

      request['user'] = user;

      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async getUserByUid(uid: string) {
    return await this.prisma.user.findFirst({
      where: {
        uid,
      },
    });
  }
}
