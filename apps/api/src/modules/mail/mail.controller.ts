import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { MailAccountManagerService } from './application/services/mail-account.manager.service';
import { CreateMailAccountDto } from './presentation/dto/mail.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Mail')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('mail')
export class MailController {
  constructor(private readonly mailAccountManager: MailAccountManagerService) {}

  @Post('accounts')
  @Roles('Owner', 'Admin')
  async createAccount(@Request() req: any, @Body() dto: CreateMailAccountDto) {
    return this.mailAccountManager.createAccount(req.user.organizationId, dto);
  }

  @Get('accounts')
  @Roles('Owner', 'Admin')
  async getAccounts(@Request() req: any) {
    return this.mailAccountManager.getAccounts(req.user.organizationId);
  }

  @Post('accounts/:id/default')
  @Roles('Owner', 'Admin')
  async setDefault(@Request() req: any, @Param('id') id: string) {
    return this.mailAccountManager.setDefault(req.user.organizationId, id);
  }
}
