import { Module } from '@nestjs/common';
import { WorkspacesModule } from './workspaces/workspaces.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [WorkspacesModule, AuthModule],
})
export class AppModule {}
