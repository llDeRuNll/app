import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { WorkspaceAccessService } from './workspace-acces.service.js';
import { or } from '@prisma/orm-postgres/orm-client';

@Injectable()
export class WorkspacesService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,

    @Inject(WorkspaceAccessService)
    private readonly workspaceAccessService: WorkspaceAccessService,
  ) {}

  findAll(userId: string) {
    return this.prisma.db.orm.public.Workspace.where((workspace) =>
      or(workspace.ownerId.eq(userId), workspace.members.some({ userId })),
    ).all();
  }

  async findOne(workspaceId: string, userId: string) {
    await this.workspaceAccessService.requireAccess(workspaceId, userId);
    const workspace = await this.prisma.db.orm.public.Workspace.include(
      'boards',
      (boards) =>
        boards.orderBy((board) => board.position.asc()).include('tasks'),
    )
      .include('members', (members) => members.include('user'))
      .where({
        id: workspaceId,
      })
      .first();

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const { members, ...workspaceData } = workspace;

    return {
      ...workspaceData,

      members: members.map((member) => ({
        userId: member.userId,
        email: member.user.email,
        createdAt: member.createdAt,
      })),
    };
  }

  create(name: string, userId: string) {
    return this.prisma.db.orm.public.Workspace.create({
      name,
      ownerId: userId,
    });
  }

  async update(workspaceId: string, userId: string, name: string) {
    await this.workspaceAccessService.requireOwner(workspaceId, userId);

    const workspace = await this.prisma.db.orm.public.Workspace.where({
      id: workspaceId,
    }).update({ name });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    return workspace;
  }

  async remove(workspaceId: string, userId: string) {
    await this.workspaceAccessService.requireOwner(workspaceId, userId);

    const workspace = await this.prisma.db.orm.public.Workspace.where({
      id: workspaceId,
    }).delete();

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    return workspace;
  }
}
