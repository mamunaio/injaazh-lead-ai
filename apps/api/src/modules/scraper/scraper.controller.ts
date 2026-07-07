import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ScraperManagerService } from './application/services/scraper.manager.service';
import { CreateScrapeJobDto } from './presentation/dto/create-scrape-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Scraper')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperManager: ScraperManagerService) {}

  @Post('jobs')
  @Roles('Owner', 'Admin') // Only admins/owners can start scrapes
  async createJob(@Request() req: any, @Body() createDto: CreateScrapeJobDto) {
    return this.scraperManager.queueJob(req.user.organizationId, createDto);
  }

  @Get('jobs')
  @Roles('Owner', 'Admin', 'Member')
  async getAllJobs(@Request() req: any) {
    return this.scraperManager.getJobsByOrganization(req.user.organizationId);
  }

  @Get('jobs/:id')
  @Roles('Owner', 'Admin', 'Member')
  async getJobStatus(@Request() req: any, @Param('id') id: string) {
    return this.scraperManager.getJobStatus(req.user.organizationId, id);
  }
}
