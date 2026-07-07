import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { LlmEngineService } from '../application/services/llm-engine.service';
import { GenerateLlmDto } from './dtos/generate-llm.dto';

@ApiTags('LLM Engine')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('llm')
export class LlmController {
  constructor(private readonly llmEngineService: LlmEngineService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate content using the active LLM adapter' })
  @ApiResponse({ status: 201, description: 'Content successfully generated.' })
  async generateContent(@Body() dto: GenerateLlmDto) {
    const options = {
      model: dto.model,
      temperature: dto.temperature,
      systemInstruction: dto.systemInstruction,
    };

    if (dto.expectJson) {
      const jsonResponse = await this.llmEngineService.generateJson<any>(dto.prompt, options);
      return { data: jsonResponse };
    }

    const textResponse = await this.llmEngineService.generateText(dto.prompt, options);
    return { data: textResponse };
  }
}
