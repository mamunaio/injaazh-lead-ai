import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { SequenceManagerService } from '../application/services/sequence.manager.service';
import { CreateSequenceDto, UpdateSequenceDto } from './dto/sequence.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Sequences')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sequences')
export class SequencesController {
  constructor(private readonly sequenceManager: SequenceManagerService) {}

  @Post()
  @Roles('Owner', 'Admin')
  async createSequence(@Request() req: any, @Body() createDto: CreateSequenceDto) {
    return this.sequenceManager.createSequence(req.user.organizationId, createDto);
  }

  @Get()
  @Roles('Owner', 'Admin', 'Member')
  async getSequences(@Request() req: any) {
    return this.sequenceManager.getSequences(req.user.organizationId);
  }

  @Get(':id')
  @Roles('Owner', 'Admin', 'Member')
  async getSequence(@Request() req: any, @Param('id') id: string) {
    return this.sequenceManager.getSequence(req.user.organizationId, id);
  }

  @Patch(':id')
  @Roles('Owner', 'Admin')
  async updateSequence(@Request() req: any, @Param('id') id: string, @Body() updateDto: UpdateSequenceDto) {
    return this.sequenceManager.updateSequence(req.user.organizationId, id, updateDto);
  }

  @Delete(':id')
  @Roles('Owner', 'Admin')
  async deleteSequence(@Request() req: any, @Param('id') id: string) {
    return this.sequenceManager.deleteSequence(req.user.organizationId, id);
  }
}
