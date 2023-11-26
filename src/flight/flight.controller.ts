// Nest
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Third party
import { Observable, lastValueFrom } from 'rxjs';

// INTERFACES
import { IFlight } from 'src/common/interfaces/flight.interface';

// DTO
import { FlightDTO } from './dto/flight.dto';

// Constants
import { FlightrMSG, PassengerMSG } from 'src/common/constants';

// Guards
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

// Proxy
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';

@ApiTags('Flights')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private _clientProxyFlight = this.clientProxy.clientProxyFlights();
  private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(@Body() flightDTO: FlightDTO): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightrMSG.CREATE, flightDTO);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this._clientProxyFlight.send(FlightrMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightrMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() flightDTO: FlightDTO,
  ): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightrMSG.UPDATE, { id, flightDTO });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyFlight.send(FlightrMSG.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await lastValueFrom(
      this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, passengerId),
    );

    if (!passenger)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

    return this._clientProxyFlight.send(FlightrMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
