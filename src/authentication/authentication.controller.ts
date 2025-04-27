import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { OptService } from 'src/opt/opt.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('التحقق عبر البريد الإلكتروني')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private optService: OptService,
    private emailService: EmailService,
  ) {}

  @Post('send-otp')
  @ApiOperation({
    summary: 'إرسال رمز التحقق (OTP)',
    description:
      'تقوم هذه العملية بإرسال رمز التحقق (OTP) إلى البريد الإلكتروني المدخل.',
  })
  @ApiBody({
    description: 'البريد الإلكتروني للمستخدم',
    type: String,
    examples: {
      example1: { value: 'user@example.com' },
    },
  })
  async sendOTP(@Body('email') email: string) {
    const otpResult = await this.optService.storeOTP(email);
    if (typeof otpResult === 'string') {
      await this.emailService.sendOTP(email, otpResult);
      return { message: 'OTP sent successfully!' };
    }
    return otpResult.message;
  }

  @Post('verify-otp')
  @ApiOperation({
    summary: 'التحقق من رمز التحقق (OTP)',
    description:
      'تقوم هذه العملية بالتحقق من صحة رمز OTP المدخل وتأكيد إنشاء الحساب.',
  })
  @ApiBody({
    description: 'البريد الإلكتروني ورمز التحقق (OTP)',
    type: String,
    examples: {
      example1: { value: 'user@example.com' },
      example2: { value: '123456' },
    },
  })
  async verifyOTP(@Body('email') email: string, @Body('otp') otp: string) {
    const isValid = await this.optService.verfiyOTP(email, otp);
    return isValid
      ? { message: 'OTP verified! Account created.' }
      : { message: 'Invalid or expired OTP.' };
  }
}
