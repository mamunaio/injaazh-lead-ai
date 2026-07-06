import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '@injaazh/config';
import { AppLoggerModule } from '@injaazh/logger';
import { DatabaseModule } from '@injaazh/database';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [AppConfigModule, AppLoggerModule, DatabaseModule, AuthModule, OrganizationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
