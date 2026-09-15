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
  createTaskSchema,
  type CreateTaskDto,
  type UpdateTaskDto,
  updateTaskSchema,
} from './dto/task.dto.js';
import { TasksService } from './tasks.service.js';

@Controller('workspaces/:workspaceId/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(
    @Param('workspaceId') workspaceId: string,
    @Param('boardId') boardId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.tasksService.findAll(workspaceId, boardId, user.id);
  }

  @Post()
  create(
    @Param('workspaceId') workspaceId: string,
    @Param('boardId') boardId: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(createTaskSchema))
    body: CreateTaskDto,
  ) {
    return this.tasksService.create(workspaceId, boardId, user.id, body.title);
  }

  @Patch(':taskId')
  update(
    @Param('workspaceId') workspaceId: string,
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(updateTaskSchema))
    body: UpdateTaskDto,
  ) {
    return this.tasksService.update(
      workspaceId,
      boardId,
      taskId,
      user.id,
      body.title,
    );
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('workspaceId') workspaceId: string,
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @CurrentUser() user: AuthUser,
  ) {
    await this.tasksService.remove(workspaceId, boardId, taskId, user.id);
  }
}
