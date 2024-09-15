import { Module } from '@nestjs/common';
import { APSModule } from './modules/aps/aps.module';

@Module({
  imports: [APSModule],
})
export class HttpModule {}
