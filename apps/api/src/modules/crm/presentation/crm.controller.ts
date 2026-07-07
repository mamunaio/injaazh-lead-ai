import { Controller, Get, Post, Patch, Body, Param, Request, UseGuards } from '@nestjs/common';
import { CrmService } from '../application/services/crm.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('crm')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get('pipelines')
  @Roles('Owner', 'Admin', 'Member')
  async getPipelines(@Request() req: any) {
    return this.crmService.getPipelines(req.user.organizationId);
  }

  @Post('deals')
  @Roles('Owner', 'Admin', 'Member')
  async createDeal(
    @Request() req: any,
    @Body() body: { leadId: string, stageId: string, name: string, value?: number }
  ) {
    return this.crmService.createDeal(
      req.user.organizationId,
      body.leadId,
      body.stageId,
      body.name,
      body.value
    );
  }

  @Get('deals')
  @Roles('Owner', 'Admin', 'Member')
  async getDeals(@Request() req: any) {
    return this.crmService.getDeals(req.user.organizationId);
  }

  @Patch('deals/:id/stage')
  @Roles('Owner', 'Admin', 'Member')
  async updateDealStage(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: { stageId: string }
  ) {
    return this.crmService.updateDealStage(req.user.organizationId, id, body.stageId);
  }
}
