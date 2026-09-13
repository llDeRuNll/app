import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class WorkspacesService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  findAll() {
    return this.prisma.db.orm.public.Workspace.all();
  }

  create(name: string) {
    return this.prisma.db.orm.public.Workspace.create({
      name,
    });
  }
}
