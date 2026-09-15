import { Module } from '@nestjs/common';
import { WorkspacesModule } from './workspaces/workspaces.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './boards/boards.module.js';
import { TasksModule } from './tasks/tasks.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    WorkspacesModule,
    BoardsModule,
    TasksModule,
  ],
})
export class AppModule {}
