import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ImportEngineService } from '../application/services/import-engine.service';
import { ImportLeadDto } from './dto/import-lead.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Import')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('import')
export class ImportController {
  constructor(private readonly importEngineService: ImportEngineService) {}

  @Post()
  @ApiOperation({ summary: 'Import leads from various sources' })
  async importLeads(@Request() req: any, @Body() importDto: ImportLeadDto) {
    const organizationId = req.user.organizationId;
    
    const results = await this.importEngineService.processImport(
      organizationId,
      importDto.sourceType,
      importDto.payload
    );

    return {
      success: true,
      totalProcessed: results.length,
      successful: results.filter(r => !r.isFailed()).length,
      failed: results.filter(r => r.isFailed()).length,
      results: results.map(r => ({
        status: r.status,
        email: r.normalizedLead.email,
        errors: r.errors,
        savedLeadId: r.savedLeadId,
      })),
    };
  }
}
