import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsIn,
  MinLength,
} from 'class-validator';

export class SickCreateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsIn(['male', 'female'], {
    message: 'Sexe must be either "male" or "female"',
  })
  sexe: string;

  @IsPhoneNumber('DZ', { message: 'Invalid phone number format for Algeria' })
  tel: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export type SickUserDto = {
  firstName: string;
  lastName: string;
  sexe: string;
  email: string | null;
  tel: string | null;
};
