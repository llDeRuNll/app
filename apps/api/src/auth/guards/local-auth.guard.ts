import {
  BadRequestException,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { z } from 'zod';

import { loginSchema } from '../dto/login.dto.js';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  override canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<{ body: unknown }>();

    const result = loginSchema.safeParse(request.body);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: z.flattenError(result.error),
      });
    }

    request.body = result.data;

    return super.canActivate(context);
  }
}
