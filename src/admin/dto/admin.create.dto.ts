import { IsString, IsEmail, MinLength, IsIn } from 'class-validator';

export class AdminCreateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsIn(['male', 'female'], {
    message: 'Sexe must be either "male" or "female"',
  })
  sexe: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
