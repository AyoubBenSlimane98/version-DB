import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsIn,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SickCreateDto {
  @ApiProperty({
    description: 'الاسم الأول للمريض',
    example: 'أحمد',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'الاسم الأخير للمريض',
    example: 'محمد',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'الجنس يجب أن يكون "male" أو "female"',
    example: 'male',
    enum: ['male', 'female'],
  })
  @IsIn(['male', 'female'], {
    message: 'Sexe must be either "male" or "female"',
  })
  sexe: string;

  @ApiProperty({
    description: 'رقم الهاتف للمريض. يجب أن يكون تنسيق الهاتف في الجزائر',
    example: '+213XXXXXXXXX',
  })
  @IsPhoneNumber('DZ', { message: 'Invalid phone number format for Algeria' })
  tel: string;

  @ApiProperty({
    description: 'البريد الإلكتروني للمريض',
    example: 'ahmed@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'كلمة المرور للمريض يجب أن تكون على الأقل 6 أحرف',
    example: 'Password123',
  })
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
