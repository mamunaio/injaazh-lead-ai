import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './application/services/users.service';
import { CreateUserDto } from './presentation/dto/create-user.dto';
import { UpdateUserDto } from './presentation/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createDto: CreateUserDto) {
    return this.usersService.create(createDto);
  }

  @Get('me')
  async getProfile(@Request() req: any) {
    return this.usersService.findById(req.user.userId);
  }

  @Get('organization/:orgId')
  @Roles('Owner', 'Admin')
  async findByOrganization(@Param('orgId') orgId: string) {
    return this.usersService.findByOrganization(orgId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @Roles('Owner', 'Admin')
  async update(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return this.usersService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles('Owner')
  async remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
