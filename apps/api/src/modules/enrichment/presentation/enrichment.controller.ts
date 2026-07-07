import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { EnrichmentManagerService } from '../application/services/enrichment-manager.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

class TriggerEnrichmentDto {
  @ApiProperty({ description: 'The ID of the lead to enrich' })
  leadId!: string;

  @ApiProperty({ description: 'Optional initial domain to bypass detection', required: false })
  initialDomain?: string;

  @ApiProperty({ description: 'Optional initial email to assist domain detection', required: false })
  initialEmail?: string;
}

@ApiTags('Enrichment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('enrichment')
export class EnrichmentController {
  constructor(private readonly enrichmentManager: EnrichmentManagerService) {}

  @Post('trigger')
  @ApiOperation({ summary: 'Manually trigger enrichment for a specific lead' })
  async triggerEnrichment(@Request() req: any, @Body() dto: TriggerEnrichmentDto) {
    const organizationId = req.user.organizationId;
    
    return this.enrichmentManager.queueEnrichment(
      organizationId,
      dto.leadId,
      dto.initialDomain,
      dto.initialEmail
    );
  }
}
