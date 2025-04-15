import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsPhoneNumber,
  IsInt,
  Min,
} from 'class-validator';

export class AppointmentCreateDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsPhoneNumber('DZ')
  tel: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsDateString()
  date: Date;

  @IsInt()
  @Min(1)
  numberTurnPatient: number;
}
