// Nest
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import { UserMSG } from 'src/common/constants';

// Proxy
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';

// DTO
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFlights,
    private readonly jwtService: JwtService,
  ) {}

  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  async validateUser(username: string, password: string): Promise<any> {
    const user = await lastValueFrom(
      this._clientProxyUser.send(UserMSG.VALID_USER, {
        username,
        password,
      }),
    );

    if (user) return user;

    return null;
  }

  async singIn(user: any) {
    try {
      const payload = {
        username: user.username,
        sub: user._id,
      };
      console.log(user, payload, 'PAYLOAD', this.jwtService);
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.log(error, 'ERROR');
    }
  }

  async signUp(userDTO: UserDTO) {
    return await lastValueFrom(
      this._clientProxyUser.send(UserMSG.CREATE, userDTO),
    );
  }
}
