import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { LocalStrategy } from './strategies/local-auth.strategy.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthSessionsService } from './auth-sessions.service.js';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PassportModule.register({
      session: false,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
          throw new Error('JWT_SECRET is not configured');
        }

        return {
          secret,

          signOptions: {
            expiresIn: 15 * 60,
            issuer: 'workspace-board-api',
            audience: 'workspace-board-client',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthSessionsService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AuthModule {}
