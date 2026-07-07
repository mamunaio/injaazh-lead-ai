import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AiManagerService } from './application/services/ai.manager.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('AI')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiManager: AiManagerService) {}

  @Post('generate-emails')
  @Roles('Owner', 'Admin', 'Member')
  async generateEmails(@Request() req: any, @Body() body: { leadIds: string[] }) {
    return this.aiManager.queueGeneration(req.user.organizationId, body.leadIds);
  }
}
