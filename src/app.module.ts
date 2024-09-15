import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { ConfigModule } from '@nestjs/config';
import config from './config';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env', '.env.local'],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    HttpModule,
  ],
})
export class AppModule {}
