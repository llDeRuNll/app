import { Module } from '@nestjs/common';
import { WorkspacesModule } from './workspaces/workspaces.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WorkspacesModule,
    AuthModule,
  ],
})
export class AppModule {}
