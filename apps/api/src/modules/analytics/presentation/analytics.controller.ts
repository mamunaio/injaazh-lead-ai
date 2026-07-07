import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { AnalyticsService } from '../application/services/analytics.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get high-level dashboard metrics' })
  async getDashboard(@Req() req: any) {
    const orgId = req.user.organizationId;
    return this.analyticsService.getDashboardMetrics(orgId);
  }

  @Get('campaigns')
  @ApiOperation({ summary: 'Get campaign performance metrics' })
  async getCampaignsPerformance(@Req() req: any) {
    const orgId = req.user.organizationId;
    return this.analyticsService.getCampaignsPerformance(orgId);
  }
}
