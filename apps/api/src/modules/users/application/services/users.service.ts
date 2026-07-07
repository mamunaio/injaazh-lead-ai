import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../../presentation/dto/create-user.dto';
import { UpdateUserDto } from '../../presentation/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createDto: CreateUserDto) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(createDto.password, saltRounds);
    
    // Do not pass the raw password to the repository
    const userToCreate = {
      email: createDto.email,
      firstName: createDto.firstName,
      lastName: createDto.lastName,
      organizationId: createDto.organizationId,
      passwordHash,
      roles: createDto.roles,
    };
    
    return this.userRepository.create(userToCreate);
  }

  async findById(id: string) {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findByOrganization(organizationId: string) {
    return this.userRepository.findByOrganization(organizationId);
  }

  async update(id: string, updateDto: UpdateUserDto) {
    return this.userRepository.update(id, updateDto);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
