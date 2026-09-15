import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { WorkspaceAccessService } from '../workspaces/workspace-acces.service.js';

@Injectable()
export class TasksService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,

    @Inject(WorkspaceAccessService)
    private readonly workspaceAccessService: WorkspaceAccessService,
  ) {}

  private async requireBoard(workspaceId: string, boardId: string) {
    const board = await this.prisma.db.orm.public.Board.first({
      id: boardId,
      workspaceId,
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return board;
  }

  async findAll(workspaceId: string, boardId: string, userId: string) {
    await this.workspaceAccessService.requireAccess(workspaceId, userId);

    await this.requireBoard(workspaceId, boardId);

    return this.prisma.db.orm.public.Task.where({
      boardId,
    }).all();
  }

  async create(
    workspaceId: string,
    boardId: string,
    userId: string,
    title: string,
  ) {
    await this.workspaceAccessService.requireAccess(workspaceId, userId);

    await this.requireBoard(workspaceId, boardId);

    return this.prisma.db.orm.public.Task.create({
      title,
      boardId,
    });
  }

  async update(
    workspaceId: string,
    boardId: string,
    taskId: string,
    userId: string,
    title: string,
  ) {
    await this.workspaceAccessService.requireAccess(workspaceId, userId);

    await this.requireBoard(workspaceId, boardId);

    const task = await this.prisma.db.orm.public.Task.first({
      id: taskId,
      boardId,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.db.orm.public.Task.where({
      id: taskId,
      boardId,
    }).update({
      title,
    });
  }

  async remove(
    workspaceId: string,
    boardId: string,
    taskId: string,
    userId: string,
  ) {
    await this.workspaceAccessService.requireAccess(workspaceId, userId);

    await this.requireBoard(workspaceId, boardId);

    const task = await this.prisma.db.orm.public.Task.first({
      id: taskId,
      boardId,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.prisma.db.orm.public.Task.where({
      id: taskId,
      boardId,
    }).delete();
  }
}
