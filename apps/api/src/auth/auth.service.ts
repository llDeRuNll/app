import { ConflictException, Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import type { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  private static readonly SALT_ROUNDS = 12;

  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async register({ email, password }: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, AuthService.SALT_ROUNDS);

    const user = await this.usersService.create(email, passwordHash);

    return {
      id: user.id,
      email: user.email,
    };
  }
}
