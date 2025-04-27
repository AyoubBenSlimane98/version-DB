import { IsOptional, IsString, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AdminUpdateDto {
  @ApiPropertyOptional({ description: 'الاسم الأول للمسؤول (اختياري)' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'الاسم الأخير للمسؤول (اختياري)' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'الجنس (اختياري: يجب أن يكون "male" أو "female")',
  })
  @IsOptional()
  @IsIn(['male', 'female'], {
    message: 'sexe must be MALE or FEMALE,',
  })
  sexe?: string;
}
