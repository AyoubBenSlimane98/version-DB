import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsPhoneNumber,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentCreateDto {
  @ApiProperty({ description: 'الاسم الأول للمريض' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'الاسم الأخير للمريض' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'رقم الهاتف للمريض (بصيغة الجزائر)' })
  @IsPhoneNumber('DZ')
  tel: string;

  @ApiProperty({ description: 'الوقت المحدد للموعد (مثال: 10:30)' })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ description: 'تاريخ الموعد (بصيغة YYYY-MM-DD)' })
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'رقم الدور للمريض (يجب أن يكون أكبر من أو يساوي 1)',
  })
  @IsInt()
  @Min(1)
  numberTurnPatient: number;
}
