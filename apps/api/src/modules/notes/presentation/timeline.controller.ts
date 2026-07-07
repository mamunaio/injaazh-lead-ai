import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { TimelineService } from '../application/services/timeline.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('timeline')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  @Roles('Owner', 'Admin', 'Member')
  async getTimeline(
    @Request() req: any,
    @Query('leadId') leadId?: string,
    @Query('dealId') dealId?: string,
  ) {
    return this.timelineService.getTimeline(req.user.organizationId, leadId, dealId);
  }
}
