import { IsOptional, IsString, IsIn } from 'class-validator';

export class AdminUpdateDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsIn(['male', 'female'], {
    message: 'sexe must be MALE or FEMALE,',
  })
  sexe?: string;
}
