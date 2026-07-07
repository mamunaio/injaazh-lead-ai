import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AiManagerService } from './application/services/ai.manager.service';
import { AiWebsiteAuditService } from './application/services/ai-website-audit.service';
import { AiLeadScoringService } from './application/services/ai-lead-scoring.service';
import { AiFollowupGeneratorService } from './application/services/ai-followup-generator.service';
import { AiSubjectOptimizerService } from './application/services/ai-subject-optimizer.service';
import { AiEmailAbTestingService } from './application/services/ai-email-ab-testing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('AI')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ai')
export class AiController {
  constructor(
    private readonly aiManager: AiManagerService,
    private readonly aiWebsiteAuditService: AiWebsiteAuditService,
    private readonly aiLeadScoringService: AiLeadScoringService,
    private readonly aiFollowupGeneratorService: AiFollowupGeneratorService,
    private readonly aiSubjectOptimizerService: AiSubjectOptimizerService,
    private readonly aiEmailAbTestingService: AiEmailAbTestingService,
  ) {}

  @Post('generate-emails')
  @Roles('Owner', 'Admin', 'Member')
  async generateEmails(@Request() req: any, @Body() body: { leadIds: string[] }) {
    return this.aiManager.queueGeneration(req.user.organizationId, body.leadIds);
  }

  @Post('audit-website')
  @Roles('Owner', 'Admin', 'Member')
  async auditWebsite(@Body() body: { url: string }) {
    return this.aiWebsiteAuditService.auditWebsite(body.url);
  }

  @Post('score-lead')
  @Roles('Owner', 'Admin', 'Member')
  async scoreLead(@Request() req: any, @Body() body: { leadId: string, icpContext: string }) {
    return this.aiLeadScoringService.scoreLead(req.user.organizationId, body.leadId, body.icpContext);
  }

  @Post('generate-followup')
  @Roles('Owner', 'Admin', 'Member')
  async generateFollowup(@Request() req: any, @Body() body: { leadId: string, previousEmail: string, followupType?: string }) {
    return this.aiFollowupGeneratorService.generateFollowup(
      req.user.organizationId, 
      body.leadId, 
      body.previousEmail, 
      body.followupType
    );
  }

  @Post('optimize-subject')
  @Roles('Owner', 'Admin', 'Member')
  async optimizeSubject(@Request() req: any, @Body() body: { emailBody: string, originalSubject?: string, tone?: string }) {
    return this.aiSubjectOptimizerService.optimizeSubject(body.emailBody, body.originalSubject, body.tone);
  }

  @Post('generate-ab-variants')
  @Roles('Owner', 'Admin', 'Member')
  async generateAbVariants(@Request() req: any, @Body() body: { originalEmail: string, strategy: string, count?: number }) {
    return this.aiEmailAbTestingService.generateVariants(body.originalEmail, body.strategy, body.count);
  }
}
