import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { WorkspacesService } from './workspaces.service.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import type { AuthUser } from '../auth/types/auth-user.js';
import {
  createWorkspaceSchema,
  type UpdateWorkspaceDto,
  updateWorkspaceSchema,
  type CreateWorkspaceDto,
} from './dto/workspace.dto.js';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe.js';
import { WorkspaceMembersService } from './workspace-members.service.js';
import {
  type AddWorkspaceMemberDto,
  addWorkspaceMemberSchema,
} from './dto/workspace-member.dto.js';

@Controller('workspaces')
export class WorkspacesController {
  constructor(
    @Inject(WorkspacesService)
    private readonly workspacesService: WorkspacesService,

    @Inject(WorkspaceMembersService)
    private readonly workspaceMembersService: WorkspaceMembersService,
  ) {}

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.workspacesService.findAll(user.id);
  }

  @Get(':workspaceId')
  findOne(
    @Param('workspaceId') workspaceId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.workspacesService.findOne(workspaceId, user.id);
  }

  @Post()
  create(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(createWorkspaceSchema))
    body: CreateWorkspaceDto,
  ) {
    return this.workspacesService.create(body.name, user.id);
  }

  @Patch(':workspaceId')
  update(
    @Param('workspaceId') workspaceId: string,
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(updateWorkspaceSchema))
    body: UpdateWorkspaceDto,
  ) {
    return this.workspacesService.update(workspaceId, user.id, body.name);
  }

  @Delete(':workspaceId')
  remove(
    @Param('workspaceId') workspaceId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.workspacesService.remove(workspaceId, user.id);
  }

  @Post(':workspaceId/members')
  addMember(
    @Param('workspaceId') workspaceId: string,
    @CurrentUser() user: AuthUser,

    @Body(new ZodValidationPipe(addWorkspaceMemberSchema))
    body: AddWorkspaceMemberDto,
  ) {
    return this.workspaceMembersService.add(workspaceId, user.id, body.email);
  }

  @Delete(':workspaceId/members/:userId')
  removeMember(
    @Param('workspaceId') workspaceId: string,
    @Param('userId') memberUserId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.workspaceMembersService.remove(
      workspaceId,
      user.id,
      memberUserId,
    );
  }
}
