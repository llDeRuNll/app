import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
