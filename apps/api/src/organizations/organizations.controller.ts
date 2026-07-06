import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { OrganizationsService } from './application/services/organizations.service';
import { CreateOrganizationDto } from './presentation/dto/create-organization.dto';
import { UpdateOrganizationDto } from './presentation/dto/update-organization.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async create(@Request() req: any, @Body() createDto: CreateOrganizationDto) {
    // req.user is injected by JwtStrategy
    const ownerId = req.user.userId;
    return this.organizationsService.create({ ...createDto, ownerId });
  }

  @Get()
  async findAllMine(@Request() req: any) {
    const ownerId = req.user.userId;
    return this.organizationsService.findByOwnerId(ownerId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.organizationsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateOrganizationDto) {
    return this.organizationsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.organizationsService.delete(id);
  }
}
