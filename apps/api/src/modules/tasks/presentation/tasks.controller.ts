import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Request, UseGuards } from '@nestjs/common';
import { TasksService } from '../application/services/tasks.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles('Owner', 'Admin', 'Member')
  async createTask(
    @Request() req: any,
    @Body() body: {
      title: string;
      description?: string;
      type?: string;
      dueDate: string;
      leadId?: string;
      dealId?: string;
      assignedTo?: string; // Optional, defaults to self
    }
  ) {
    const assignedTo = body.assignedTo || req.user.sub;
    return this.tasksService.createTask(req.user.organizationId, assignedTo, {
      ...body,
      dueDate: new Date(body.dueDate),
    });
  }

  @Get()
  @Roles('Owner', 'Admin', 'Member')
  async getTasks(
    @Request() req: any,
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('assignedTo') assignedTo?: string,
    @Query('leadId') leadId?: string,
    @Query('dealId') dealId?: string,
  ) {
    return this.tasksService.getTasks(req.user.organizationId, {
      status, type, assignedTo, leadId, dealId
    });
  }

  @Get(':id')
  @Roles('Owner', 'Admin', 'Member')
  async getTaskById(@Request() req: any, @Param('id') id: string) {
    return this.tasksService.getTaskById(req.user.organizationId, id);
  }

  @Patch(':id')
  @Roles('Owner', 'Admin', 'Member')
  async updateTask(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: any
  ) {
    return this.tasksService.updateTask(req.user.organizationId, id, body);
  }

  @Delete(':id')
  @Roles('Owner', 'Admin', 'Member')
  async deleteTask(@Request() req: any, @Param('id') id: string) {
    return this.tasksService.deleteTask(req.user.organizationId, id);
  }
}
