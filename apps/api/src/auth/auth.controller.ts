import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login endpoint placeholder' })
  async login(@Body() body: any) {
    // Basic mock user until User module is integrated
    const mockUser = { email: body.email, userId: '1', roles: ['user'] };
    return this.authService.login(mockUser);
  }
}
