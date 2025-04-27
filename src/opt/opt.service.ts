import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateOTP } from 'src/util/generateOTP';

@Injectable()
export class OptService {
  constructor(private readonly prisma: PrismaService) {}
  async storeOTP(email: string) {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const account = await this.prisma.account.findUnique({ where: { email } });
    if (!account) {
      return {
        valaid: false,
        message: 'Email inccorect or not valid !',
      };
    }
    await this.prisma.optCode.upsert({
      where: { email },
      update: {
        otp,
        expiresAt: expiresAt,
      },
      create: {
        email,
        otp,
        expiresAt: expiresAt,
      },
    });
    return otp;
  }

  async verfiyOTP(email: string, enteredOTP: string): Promise<boolean> {
    const otpRecord = await this.prisma.optCode.findFirst({ where: { email } });
    if (!otpRecord) return false;
    if (new Date() > otpRecord.expiresAt) {
      await this.prisma.optCode.delete({ where: { email } });
      return false;
    }
    if (otpRecord.otp !== enteredOTP) return false;
    await this.prisma.optCode.delete({ where: { email } });
    return true;
  }
}
