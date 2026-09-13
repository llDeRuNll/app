import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { WorkspacesService } from './workspaces.service.js';

@Controller('workspaces')
export class WorkspacesController {
  constructor(
    @Inject(WorkspacesService)
    private readonly workspacesService: WorkspacesService,
  ) {}

  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }
  @Post()
  create(@Body() body: { name: string }) {
    return this.workspacesService.create(body.name);
  }
}
