// Nest
import { Module } from '@nestjs/common';

// Controllers
import { PassengerController } from './passenger.controller';

// Modules
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [PassengerController],
})
export class PassengerModule {}
