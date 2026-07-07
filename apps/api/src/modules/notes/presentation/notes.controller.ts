import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Request, UseGuards } from '@nestjs/common';
import { NotesService } from '../application/services/notes.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('notes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @Roles('Owner', 'Admin', 'Member')
  async createNote(
    @Request() req: any,
    @Body() body: {
      content: string;
      leadId?: string;
      dealId?: string;
    }
  ) {
    return this.notesService.createNote(req.user.organizationId, req.user.sub, body);
  }

  @Get()
  @Roles('Owner', 'Admin', 'Member')
  async getNotes(
    @Request() req: any,
    @Query('leadId') leadId?: string,
    @Query('dealId') dealId?: string,
    @Query('authorId') authorId?: string,
  ) {
    return this.notesService.getNotes(req.user.organizationId, {
      leadId, dealId, authorId
    });
  }

  @Get(':id')
  @Roles('Owner', 'Admin', 'Member')
  async getNoteById(@Request() req: any, @Param('id') id: string) {
    return this.notesService.getNoteById(req.user.organizationId, id);
  }

  @Patch(':id')
  @Roles('Owner', 'Admin', 'Member')
  async updateNote(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: any
  ) {
    return this.notesService.updateNote(req.user.organizationId, id, body);
  }

  @Delete(':id')
  @Roles('Owner', 'Admin', 'Member')
  async deleteNote(@Request() req: any, @Param('id') id: string) {
    return this.notesService.deleteNote(req.user.organizationId, id);
  }
}
