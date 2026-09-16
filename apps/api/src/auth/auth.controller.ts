import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe.js';
import { AuthService } from './auth.service.js';
import { registerSchema, type RegisterDto } from './dto/register.dto.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { Public } from './decorators/public.decorator.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import type { AuthUser } from './types/auth-user.js';
import {
  REFRESH_COOKIE_NAME,
  REFRESH_COOKIE_PATH,
  REFRESH_TOKEN_TTL_MS,
} from './auth.constants.js';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private getRefreshCookieOptions(): CookieOptions {
    const nodeEnv = this.configService.getOrThrow<string>('NODE_ENV');
    const isProduction = nodeEnv === 'production';

    return {
      httpOnly: true,
      secure: nodeEnv === 'production',
      sameSite: isProduction ? 'none' : 'lax',
      path: REFRESH_COOKIE_PATH,
      maxAge: REFRESH_TOKEN_TTL_MS,
    };
  }

  private getRefreshToken(request: Request): string | undefined {
    const refreshToken = request.cookies?.[REFRESH_COOKIE_NAME] as unknown;

    return typeof refreshToken === 'string' ? refreshToken : undefined;
  }

  @Public()
  @Post('register')
  async register(
    @Body(new ZodValidationPipe(registerSchema))
    body: RegisterDto,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const result = await this.authService.register(body);

    response.cookie(
      REFRESH_COOKIE_NAME,
      result.refreshToken,
      this.getRefreshCookieOptions(),
    );

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: AuthUser,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const result = await this.authService.login(user);

    response.cookie(
      REFRESH_COOKIE_NAME,
      result.refreshToken,
      this.getRefreshCookieOptions(),
    );

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const refreshToken = this.getRefreshToken(request);

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const result = await this.authService.refresh(refreshToken);

    response.cookie(
      REFRESH_COOKIE_NAME,
      result.refreshToken,
      this.getRefreshCookieOptions(),
    );

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const refreshToken = this.getRefreshToken(request);

    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    const cookieOptions = this.getRefreshCookieOptions();

    response.clearCookie(REFRESH_COOKIE_NAME, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
    });
  }
}
