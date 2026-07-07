import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './application/services/users.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserSchema, UserDocument } from './infrastructure/schemas/user.schema';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [UsersService, USER_REPOSITORY],
})
export class UsersModule {}
