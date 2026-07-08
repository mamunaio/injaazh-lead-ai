import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/application/services/users.service';
import { OrganizationsService } from '../organizations/application/services/organizations.service';
import { LoginDto } from './presentation/dto/login.dto';
import { RegisterDto } from './presentation/dto/register.dto';
import { CrmService } from '../crm/application/services/crm.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly organizationsService: OrganizationsService,
    private readonly crmService: CrmService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== 'Active') {
      throw new UnauthorizedException('Account is suspended');
    }

    const payload = { email: user.email, sub: user.id, roles: user.roles, organizationId: user.organizationId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // Since we need an organization ID to create the user, but we need an owner ID to create the organization...
    // We will create the user first with a temporary organization ID (or create org with temp owner),
    // but the cleanest way is: Create Org without ownerId (if schema allows) or mock it temporarily.
    // Wait, OrganizationSchema requires ownerId.
    // Let's create the Organization first with a dummy ownerId, then create the User, then update the Org's ownerId.
    
    
    const dummyOwnerId = '000000000000000000000000'; // valid 24 char hex for ObjectId
    const org = await this.organizationsService.create({
      name: registerDto.organizationName,
      ownerId: dummyOwnerId,
    });
    

    
    const user = await this.usersService.create({
      email: registerDto.email,
      password: registerDto.password,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      organizationId: org.id,
      roles: ['Owner'],
    } as any);
    

    // Now update the organization with the real owner ID
    await this.organizationsService.update(org.id, { ownerId: user.id } as any);

    // Create default CRM Pipeline for the organization
    await this.crmService.createDefaultPipeline(org.id);

    const payload = { email: user.email, sub: user.id, roles: user.roles, organizationId: user.organizationId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
