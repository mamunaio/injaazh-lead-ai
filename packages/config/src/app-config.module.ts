import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      envFilePath: ['.env.local', '.env', '../../.env.local', '../../.env'], // Load from app root and workspace root
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
