import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService } from '../users/users.service.js';
import { WorkspaceAccessService } from './workspace-acces.service.js';

@Injectable()
export class WorkspaceMembersService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,

    @Inject(UsersService)
    private readonly usersService: UsersService,

    @Inject(WorkspaceAccessService)
    private readonly workspaceAccessService: WorkspaceAccessService,
  ) {}

  async add(workspaceId: string, ownerId: string, email: string) {
    const workspace = await this.workspaceAccessService.requireOwner(
      workspaceId,
      ownerId,
    );

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id === workspace.ownerId) {
      throw new BadRequestException(
        'Workspace owner cannot be added as a member',
      );
    }

    const existingMember =
      await this.prisma.db.orm.public.WorkspaceMember.first({
        workspaceId,
        userId: user.id,
      });

    if (existingMember) {
      throw new ConflictException('User is already a workspace member');
    }

    return this.prisma.db.orm.public.WorkspaceMember.create({
      workspaceId,
      userId: user.id,
    });
  }

  async remove(workspaceId: string, ownerId: string, userId: string) {
    await this.workspaceAccessService.requireOwner(workspaceId, ownerId);

    const member = await this.prisma.db.orm.public.WorkspaceMember.first({
      workspaceId,
      userId,
    });

    if (!member) {
      throw new NotFoundException('Workspace member not found');
    }

    return this.prisma.db.orm.public.WorkspaceMember.where({
      workspaceId,
      userId,
    }).delete();
  }
}
