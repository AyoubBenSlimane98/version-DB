import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.API_KEY_EMAIL as string);
  }

  async sendOTP(email: string, otp: string) {
    const msg = {
      to: email,
      from: `"عيادة الفؤاد" <${process.env.EMAIL_HOST}>`,
      subject: 'رمز التحقق الخاص بك',
      text: `رمز OTP الخاص بك هو: ${otp}. وهو صالح لمدة 10 دقائق.`,
      html: `<p dir='ltr'>رمز OTP الخاص بك هو: <strong>${otp}</strong>. وهو صالح لمدة 10 دقائق.</p>`,
    };

    try {
      await sgMail.send(msg);
      return { message: 'OTP sent successfully!' };
    } catch (e) {
      console.error('Could not send email.', e);
      throw new Error('Could not send email.');
    }
  }
}
