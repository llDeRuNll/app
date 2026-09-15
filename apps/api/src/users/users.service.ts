import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  findByEmail(email: string) {
    return this.prisma.db.orm.public.User.first({
      email,
    });
  }

  findById(id: string) {
    return this.prisma.db.orm.public.User.first({
      id,
    });
  }

  create(email: string, passwordHash: string) {
    return this.prisma.db.orm.public.User.create({
      email,
      passwordHash,
    });
  }
}
