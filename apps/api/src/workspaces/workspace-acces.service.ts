import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { or } from '@prisma/orm-postgres/orm-client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class WorkspaceAccessService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async requireAccess(workspaceId: string, userId: string) {
    const workspace = await this.prisma.db.orm.public.Workspace.where({
      id: workspaceId,
    })
      .where((workspace) =>
        or(
          workspace.ownerId.eq(userId),

          workspace.members.some({
            userId,
          }),
        ),
      )
      .first();

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return workspace;
  }

  async requireOwner(workspaceId: string, userId: string) {
    const workspace = await this.requireAccess(workspaceId, userId);

    if (workspace.ownerId !== userId) {
      throw new ForbiddenException(
        'Only the workspace owner can perform this action',
      );
    }

    return workspace;
  }
}
