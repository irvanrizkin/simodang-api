import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('please provide token');

    try {
      const { uid } = await this.verifyToken(token);

      if (!uid) throw new UnauthorizedException('invalid firebase token');

      const user = await this.getUserByUid(uid);
      if (!user) throw new UnauthorizedException('user not found');

      request['user'] = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('invalid firebase token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyToken(token: string) {
    try {
      return await admin.auth().verifyIdToken(token);
    } catch (error) {
      throw new UnauthorizedException('invalid firebase token');
    }
  }

  async getUserByUid(uid: string) {
    return await this.prisma.user.findFirst({
      where: {
        uid,
      },
    });
  }
}
