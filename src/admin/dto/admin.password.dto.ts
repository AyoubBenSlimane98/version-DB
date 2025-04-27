import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AdminPasswordDto {
  @ApiProperty({
    description: 'كلمة المرور الجديدة (يجب أن تتكون من 6 أحرف على الأقل)',
  })
  @IsString()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({
    description: 'كلمة المرور القديمة (يجب أن تتكون من 6 أحرف على الأقل)',
  })
  @IsString()
  @MinLength(6)
  oldPassword: string;
}
