import { Controller, Get, Post, Patch, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { SegmentsService } from '../application/services/segments.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('segments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SegmentsController {
  constructor(private readonly segmentsService: SegmentsService) {}

  @Post()
  @Roles('Owner', 'Admin', 'Member')
  async createSegment(
    @Request() req: any,
    @Body() body: {
      name: string;
      description?: string;
      filters: Record<string, any>;
    }
  ) {
    return this.segmentsService.createSegment(req.user.organizationId, req.user.sub, body);
  }

  @Get()
  @Roles('Owner', 'Admin', 'Member')
  async getSegments(@Request() req: any) {
    return this.segmentsService.getSegments(req.user.organizationId);
  }

  @Get(':id')
  @Roles('Owner', 'Admin', 'Member')
  async getSegmentById(@Request() req: any, @Param('id') id: string) {
    return this.segmentsService.getSegmentById(req.user.organizationId, id);
  }

  @Patch(':id')
  @Roles('Owner', 'Admin', 'Member')
  async updateSegment(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: any
  ) {
    return this.segmentsService.updateSegment(req.user.organizationId, id, body);
  }

  @Delete(':id')
  @Roles('Owner', 'Admin', 'Member')
  async deleteSegment(@Request() req: any, @Param('id') id: string) {
    return this.segmentsService.deleteSegment(req.user.organizationId, id);
  }
}
