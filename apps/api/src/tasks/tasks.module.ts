import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { WorkspacesModule } from '../workspaces/workspaces.module.js';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';

@Module({
  imports: [PrismaModule, WorkspacesModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
