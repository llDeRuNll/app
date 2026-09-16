import { BoardsService } from './boards.service.js';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import type { AuthUser } from '../auth/types/auth-user.js';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe.js';
import {
  createBoardSchema,
  type CreateBoardDto,
  type UpdateBoardDto,
  updateBoardSchema,
  reorderBoardsSchema,
  type ReorderBoardsDto,
} from './dto/board.dto.js';
@Controller('workspaces/:workspaceId/boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll(
    @Param('workspaceId') workspaceId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.boardsService.findAll(workspaceId, user.id);
  }

  @Post()
  create(
    @Param('workspaceId') workspaceId: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(createBoardSchema))
    body: CreateBoardDto,
  ) {
    return this.boardsService.create(workspaceId, user.id, body.name);
  }

  @Patch('reorder')
  reorder(
    @Param('workspaceId') workspaceId: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(reorderBoardsSchema))
    body: ReorderBoardsDto,
  ) {
    return this.boardsService.reorder(workspaceId, user.id, body.boardIds);
  }

  @Patch(':boardId')
  update(
    @Param('workspaceId') workspaceId: string,
    @Param('boardId') boardId: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(updateBoardSchema))
    body: UpdateBoardDto,
  ) {
    return this.boardsService.update(workspaceId, boardId, user.id, body.name);
  }

  @Delete(':boardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('workspaceId') workspaceId: string,
    @Param('boardId') boardId: string,
    @CurrentUser() user: AuthUser,
  ) {
    await this.boardsService.remove(workspaceId, boardId, user.id);
  }
}
