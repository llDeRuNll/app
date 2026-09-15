import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthSessionsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  create(userId: string, tokenHash: string, expiresAt: string) {
    return this.prisma.db.orm.public.AuthSession.create({
      userId,
      tokenHash,
      expiresAt,
    });
  }

  findByTokenHash(tokenHash: string) {
    return this.prisma.db.orm.public.AuthSession.first({
      tokenHash,
    });
  }

  deleteByTokenHash(tokenHash: string) {
    return this.prisma.db.orm.public.AuthSession.where({ tokenHash }).delete();
  }

  rotate(
    sessionId: string,
    userId: string,
    newTokenHash: string,
    expiresAt: string,
  ) {
    return this.prisma.db.transaction(async (tx) => {
      const deletedSession = await tx.orm.public.AuthSession.where({
        id: sessionId,
      }).delete();

      if (!deletedSession) {
        return null;
      }

      return tx.orm.public.AuthSession.create({
        userId,
        tokenHash: newTokenHash,
        expiresAt,
      });
    });
  }
}
