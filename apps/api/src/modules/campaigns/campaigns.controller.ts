import { Controller, Post, Body, Get, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { CampaignManagerService } from './application/services/campaign.manager.service';
import { CreateCampaignDto, EnrollLeadsDto, UpdateCampaignDto } from './presentation/dto/campaign.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Campaigns')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignManager: CampaignManagerService) {}

  @Post()
  @Roles('Owner', 'Admin')
  async createCampaign(@Request() req: any, @Body() createDto: CreateCampaignDto) {
    return this.campaignManager.createCampaign(req.user.organizationId, createDto);
  }

  @Patch(':id')
  @Roles('Owner', 'Admin')
  async updateCampaign(@Request() req: any, @Param('id') campaignId: string, @Body() updateDto: UpdateCampaignDto) {
    return this.campaignManager.updateCampaign(req.user.organizationId, campaignId, updateDto);
  }

  @Get()
  @Roles('Owner', 'Admin', 'Member')
  async getCampaigns(@Request() req: any) {
    return this.campaignManager.getCampaigns(req.user.organizationId);
  }

  @Post(':id/enroll')
  @Roles('Owner', 'Admin', 'Member')
  async enrollLeads(@Request() req: any, @Param('id') campaignId: string, @Body() dto: EnrollLeadsDto) {
    return this.campaignManager.enrollLeads(req.user.organizationId, campaignId, dto.leadIds);
  }

  @Post(':id/start')
  @Roles('Owner', 'Admin')
  async startCampaign(@Request() req: any, @Param('id') campaignId: string) {
    return this.campaignManager.startCampaign(req.user.organizationId, campaignId);
  }

  @Post(':id/pause')
  @Roles('Owner', 'Admin')
  async pauseCampaign(@Request() req: any, @Param('id') campaignId: string) {
    return this.campaignManager.pauseCampaign(req.user.organizationId, campaignId);
  }

  @Post(':id/resume')
  @Roles('Owner', 'Admin')
  async resumeCampaign(@Request() req: any, @Param('id') campaignId: string) {
    return this.campaignManager.resumeCampaign(req.user.organizationId, campaignId);
  }

  @Post(':id/stop')
  @Roles('Owner', 'Admin')
  async stopCampaign(@Request() req: any, @Param('id') campaignId: string) {
    return this.campaignManager.stopCampaign(req.user.organizationId, campaignId);
  }
}
