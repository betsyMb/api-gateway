// Nest
import { ApiProperty } from '@nestjs/swagger';

// Third party
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PassengerDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
