import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { AiContextManagerService } from '../application/services/ai-context-manager.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

class TriggerAiContextDto {
  @ApiProperty({ description: 'The ID of the lead' })
  leadId!: string;

  @ApiProperty({ description: 'The goal of the context (e.g., Cold Email, LinkedIn)', default: 'Cold Email' })
  outreachGoal!: string;
}

@ApiTags('AI')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai/context')
export class AiContextController {
  constructor(private readonly aiContextManager: AiContextManagerService) {}

  @Post('trigger')
  @ApiOperation({ summary: 'Manually trigger AI context generation for a specific lead' })
  async triggerContext(@Request() req: any, @Body() dto: TriggerAiContextDto) {
    const organizationId = req.user.organizationId;
    
    return this.aiContextManager.queueContextGeneration(
      organizationId,
      dto.leadId,
      dto.outreachGoal
    );
  }
}
