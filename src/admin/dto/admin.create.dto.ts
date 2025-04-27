import { IsString, IsEmail, MinLength, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AdminCreateDto {
  @ApiProperty({ description: 'الاسم الأول للمسؤول' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'الاسم الأخير للمسؤول' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'الجنس (يجب أن يكون "male" أو "female")' })
  @IsIn(['male', 'female'], {
    message: 'Sexe must be either "male" or "female"',
  })
  sexe: string;

  @ApiProperty({ description: 'البريد الإلكتروني للمسؤول' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({ description: 'كلمة المرور (يجب أن تكون 6 أحرف على الأقل)' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
