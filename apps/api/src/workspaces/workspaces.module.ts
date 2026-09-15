import { Module } from '@nestjs/common';

import { WorkspacesController } from './workspaces.controller.js';
import { WorkspacesService } from './workspaces.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { WorkspaceAccessService } from './workspace-acces.service.js';
import { UsersModule } from '../users/users.module.js';
import { WorkspaceMembersService } from './workspace-members.service.js';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [WorkspacesController],
  providers: [
    WorkspacesService,
    WorkspaceAccessService,
    WorkspaceMembersService,
  ],

  exports: [WorkspaceAccessService],
})
export class WorkspacesModule {}
