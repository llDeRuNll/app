import { Module } from '@nestjs/common';

import { WorkspacesModule } from './workspaces/workspaces.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [WorkspacesModule, UsersModule],
})
export class AppModule {}
