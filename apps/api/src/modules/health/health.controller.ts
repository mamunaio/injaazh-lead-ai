import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, MongooseHealthIndicator, MemoryHealthIndicator, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Transport, RedisOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const redisHost = this.configService.get<string>('REDIS_HOST') || 'localhost';
    const redisPort = this.configService.get<number>('REDIS_PORT') || 6379;

    return this.health.check([
      () => this.mongoose.pingCheck('mongodb'),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB limit
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      () => this.microservice.pingCheck<RedisOptions>('redis', {
        transport: Transport.REDIS,
        options: {
          host: redisHost,
          port: redisPort,
        },
      }),
      // App is up if we hit this endpoint
      () => Promise.resolve({ api: { status: 'up' } })
    ]);
  }
}
