// Nest
import { Module } from '@nestjs/common';

// Controllers
import { UserController } from './user.controller';

// Modules
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [UserController],
})
export class UserModule {}
