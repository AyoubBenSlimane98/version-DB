import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SickLoginDto {
  @ApiProperty({
    description: 'البريد الإلكتروني للمريض',
    example: 'ahmed@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'كلمة المرور يجب أن تكون على الأقل 6 أحرف',
    example: 'Password123',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
