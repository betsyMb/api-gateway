// Nest
import { Module } from '@nestjs/common';

// Proxy
import { ClientProxySuperFlights } from './client-proxy';

@Module({
  providers: [ClientProxySuperFlights],
  exports: [ClientProxySuperFlights],
})
export class ProxyModule {}
