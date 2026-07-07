import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './presentation/dto/login.dto';
import { RegisterDto } from './presentation/dto/register.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login and get a JWT token' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user and organization' })
  async register(@Body() registerDto: RegisterDto) {
    console.log('Controller hit: register', registerDto.email);
    console.log('Mongoose readyState:', require('mongoose').connection.readyState);
    return this.authService.register(registerDto);
  }
}
