import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { LeadsService } from './application/services/leads.service';
import { CreateLeadDto } from './presentation/dto/create-lead.dto';
import { UpdateLeadDto } from './presentation/dto/update-lead.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Leads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async create(@Request() req: any, @Body() createDto: CreateLeadDto) {
    // Determine the org ID dynamically via the authenticated user token (Multi-Tenancy)
    const orgId = req.user.organizationId; // Wait, our JWT payload only has sub, email, roles!
    // I need to fetch the user's organizationId or embed it in the JWT.
    // For now, I will assume it's fetched or passed, wait, I MUST embed it in the JWT or fetch the user first.
    // Let's pass the orgId to the service and the service will find it if it's missing in JWT.
    // Actually, it's safer to embed organizationId in the JWT payload from AuthService. I will update that later.
    // Assuming `req.user.organizationId` will be available after I patch AuthService.
    
    return this.leadsService.create(req.user.organizationId, createDto);
  }

  @Get()
  async findAll(@Request() req: any) {
    return this.leadsService.findByOrganization(req.user.organizationId);
  }

  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    return this.leadsService.findById(req.user.organizationId, id);
  }

  @Patch(':id')
  async update(@Request() req: any, @Param('id') id: string, @Body() updateDto: UpdateLeadDto) {
    return this.leadsService.update(req.user.organizationId, id, updateDto);
  }

  @Delete(':id')
  async remove(@Request() req: any, @Param('id') id: string) {
    return this.leadsService.delete(req.user.organizationId, id);
  }
}
