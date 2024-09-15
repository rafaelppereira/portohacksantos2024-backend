import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { APSController } from './aps.controller';
import { FindTrafficRangeService } from './services/find-traffic-range.service';
@Module({
  imports: [HttpModule.register({})],
  controllers: [APSController],
  providers: [FindTrafficRangeService],
})
export class APSModule {}
