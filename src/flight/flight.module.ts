// Nest
import { Module } from '@nestjs/common';

// Controllers
import { FlightController } from './flight.controller';

// Modules
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [FlightController],
})
export class FlightModule {}
