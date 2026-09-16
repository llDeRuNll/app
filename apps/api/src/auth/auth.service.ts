import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import type { RegisterDto } from './dto/register.dto.js';
import { JwtService } from '@nestjs/jwt';
import type { AuthUser } from './types/auth-user.js';
import { AuthSessionsService } from './auth-sessions.service.js';
import {
  generateRefreshToken,
  hashRefreshToken,
} from './utils/refresh-token.util.js';
import { REFRESH_TOKEN_TTL_MS, SALT_ROUNDS } from './auth.constants.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,

    @Inject(JwtService)
    private readonly jwtService: JwtService,

    @Inject(AuthSessionsService)
    private readonly authSessionsService: AuthSessionsService,
  ) {}

  private async createRefreshSession(userId: string) {
    const refreshToken = generateRefreshToken();
    const tokenHash = hashRefreshToken(refreshToken);

    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS).toISOString();

    await this.authSessionsService.create(userId, tokenHash, expiresAt);

    return refreshToken;
  }

  async refresh(refreshToken: string) {
    const tokenHash = hashRefreshToken(refreshToken);

    const session = await this.authSessionsService.findByTokenHash(tokenHash);

    if (!session) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      await this.authSessionsService.deleteByTokenHash(tokenHash);

      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.usersService.findById(session.userId);

    if (!user) {
      await this.authSessionsService.deleteByTokenHash(tokenHash);

      throw new UnauthorizedException();
    }

    const newRefreshToken = generateRefreshToken();
    const newTokenHash = hashRefreshToken(newRefreshToken);

    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS).toISOString();

    const rotatedSession = await this.authSessionsService.rotate(
      session.id,
      user.id,
      newTokenHash,
      expiresAt,
    );

    if (!rotatedSession) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<AuthUser> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return {
      id: user.id,
      email: user.email,
    };
  }

  async register({ email, password }: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await this.usersService.create(email, passwordHash);

    const authUser = {
      id: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    const refreshToken = await this.createRefreshSession(user.id);

    return {
      accessToken,
      refreshToken,
      user: authUser,
    };
  }

  async login(user: AuthUser) {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    const refreshToken = await this.createRefreshSession(user.id);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async logout(refreshToken: string) {
    const tokenHash = hashRefreshToken(refreshToken);

    await this.authSessionsService.deleteByTokenHash(tokenHash);
  }
}
