import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IntelligenceManagerService } from '../application/services/intelligence-manager.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

class TriggerIntelligenceDto {
  @ApiProperty({ description: 'The ID of the lead to analyze' })
  leadId!: string;

  @ApiProperty({ description: 'Raw lead data', required: false })
  rawLead?: any;

  @ApiProperty({ description: 'Raw enrichment data from website analysis', required: false })
  rawEnrichmentData?: any;
}

@ApiTags('Intelligence')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('intelligence')
export class IntelligenceController {
  constructor(private readonly intelligenceManager: IntelligenceManagerService) {}

  @Post('trigger')
  @ApiOperation({ summary: 'Manually trigger prospect intelligence generation for a specific lead' })
  async triggerIntelligence(@Request() req: any, @Body() dto: TriggerIntelligenceDto) {
    const organizationId = req.user.organizationId;
    
    return this.intelligenceManager.queueIntelligence(
      organizationId,
      dto.leadId,
      dto.rawLead,
      dto.rawEnrichmentData
    );
  }
}
