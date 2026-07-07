import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { EmailEngineService } from '../application/services/email-engine.service';
import { GenerateEmailDto } from './dtos/generate-email.dto';

@ApiTags('Email Engine')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('email-engine')
export class EmailEngineController {
  constructor(private readonly emailEngineService: EmailEngineService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate a highly personalized email for a specific lead' })
  @ApiResponse({ status: 201, description: 'Email successfully generated.' })
  async generateEmail(@Body() dto: GenerateEmailDto, @Request() req: any) {
    const generatedEmail = await this.emailEngineService.generateEmail(
      req.user.organizationId,
      dto.leadId,
      dto.templateId
    );
    return { data: generatedEmail };
  }
}
