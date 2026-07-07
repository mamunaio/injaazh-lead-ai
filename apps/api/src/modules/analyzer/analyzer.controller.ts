import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AnalyzerManagerService } from './application/services/analyzer.manager.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Analyzer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('analyzer')
export class AnalyzerController {
  constructor(private readonly analyzerManager: AnalyzerManagerService) {}

  @Post('jobs')
  @Roles('Owner', 'Admin')
  async createAnalysisJobs(@Request() req: any, @Body() body: { rawLeads: any[] }) {
    return this.analyzerManager.queueAnalysis(req.user.organizationId, body.rawLeads);
  }
}
