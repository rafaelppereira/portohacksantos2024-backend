import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    HttpModule,
  ],
})
export class AppModule {}
