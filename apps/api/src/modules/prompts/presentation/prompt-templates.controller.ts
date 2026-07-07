import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PromptTemplateService } from '../application/services/prompt-template.service';
import { CreatePromptTemplateDto } from './dtos/create-prompt-template.dto';
import { UpdatePromptTemplateDto } from './dtos/update-prompt-template.dto';
import { PromptTemplateType } from '../domain/enums/prompt-template-type.enum';

@ApiTags('Prompt Templates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('prompts/templates')
export class PromptTemplatesController {
  constructor(private readonly promptTemplateService: PromptTemplateService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new prompt template' })
  @ApiResponse({ status: 201, description: 'The prompt template has been successfully created.' })
  create(
    @Body() createDto: CreatePromptTemplateDto,
    @Request() req: any,
  ) {
    return this.promptTemplateService.create({
      ...createDto,
      organizationId: req.user.organizationId,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all prompt templates for the organization' })
  @ApiQuery({ name: 'type', enum: PromptTemplateType, required: false })
  @ApiResponse({ status: 200, description: 'Return all prompt templates.' })
  findAll(
    @Request() req: any,
    @Query('type') type?: PromptTemplateType,
  ) {
    if (type) {
      return this.promptTemplateService.findByType(req.user.organizationId, type);
    }
    return this.promptTemplateService.findAllByOrganization(req.user.organizationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a prompt template by id' })
  @ApiResponse({ status: 200, description: 'Return the prompt template.' })
  @ApiResponse({ status: 404, description: 'Prompt template not found.' })
  findOne(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.promptTemplateService.findById(id, req.user.organizationId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a prompt template' })
  @ApiResponse({ status: 200, description: 'The prompt template has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Prompt template not found.' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePromptTemplateDto,
    @Request() req: any,
  ) {
    return this.promptTemplateService.update(id, req.user.organizationId, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a prompt template' })
  @ApiResponse({ status: 200, description: 'The prompt template has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Prompt template not found.' })
  remove(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.promptTemplateService.delete(id, req.user.organizationId);
  }
}
