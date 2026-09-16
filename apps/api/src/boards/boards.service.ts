import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { WorkspaceAccessService } from '../workspaces/workspace-acces.service.js';

@Injectable()
export class BoardsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,

    @Inject(WorkspaceAccessService)
    private readonly workspaceAccessService: WorkspaceAccessService,
  ) {}

  async findAll(workspaceId: string, userId: string) {
    await this.workspaceAccessService.requireAccess(workspaceId, userId);

    return this.prisma.db.orm.public.Board.where({
      workspaceId,
    })
      .orderBy((board) => board.position.asc())
      .all();
  }

  async create(workspaceId: string, userId: string, name: string) {
    await this.workspaceAccessService.requireAccess(workspaceId, userId);

    const boards = await this.prisma.db.orm.public.Board.where({
      workspaceId,
    }).all();

    const nextPosition =
      boards.length === 0
        ? 0
        : Math.max(...boards.map((board) => board.position)) + 1;

    return this.prisma.db.orm.public.Board.create({
      name,
      position: nextPosition,
      workspaceId,
    });
  }

  async update(
    workspaceId: string,
    boardId: string,
    userId: string,
    name: string,
  ) {
    await this.workspaceAccessService.requireAccess(workspaceId, userId);

    const board = await this.prisma.db.orm.public.Board.first({
      id: boardId,
      workspaceId,
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return this.prisma.db.orm.public.Board.where({
      id: boardId,
      workspaceId,
    }).update({
      name,
    });
  }

  async remove(workspaceId: string, boardId: string, userId: string) {
    await this.workspaceAccessService.requireAccess(workspaceId, userId);

    const board = await this.prisma.db.orm.public.Board.first({
      id: boardId,
      workspaceId,
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    await this.prisma.db.orm.public.Board.where({
      id: boardId,
      workspaceId,
    }).delete();
  }

  async reorder(workspaceId: string, userId: string, boardIds: string[]) {
    await this.workspaceAccessService.requireAccess(workspaceId, userId);

    const currentBoards = await this.prisma.db.orm.public.Board.where({
      workspaceId,
    }).all();

    if (currentBoards.length !== boardIds.length) {
      throw new BadRequestException(
        'Board list does not match workspace boards',
      );
    }

    const currentBoardIds = new Set(currentBoards.map((board) => board.id));

    const containsInvalidBoard = boardIds.some(
      (boardId) => !currentBoardIds.has(boardId),
    );

    if (containsInvalidBoard) {
      throw new BadRequestException(
        'Board list does not match workspace boards',
      );
    }

    await this.prisma.db.transaction(async (tx) => {
      for (const [position, boardId] of boardIds.entries()) {
        await tx.orm.public.Board.where({
          id: boardId,
          workspaceId,
        }).update({
          position,
        });
      }
    });

    return this.prisma.db.orm.public.Board.where({
      workspaceId,
    })
      .orderBy((board) => board.position.asc())
      .all();
  }
}
