import { IsString, MinLength } from 'class-validator';

export class AdminPasswordDto {
  @IsString()
  @MinLength(6)
  newPassword: string;
  @IsString()
  @MinLength(6)
  oldPassword: string;
}
