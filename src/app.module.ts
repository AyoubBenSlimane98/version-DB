import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { SickModule } from './sick/sick.module';
import { EncryptionModule } from './encryption/encryption.module';
import { TokenModule } from './token/token.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { EmailModule } from './email/email.module';
import { OptModule } from './opt/opt.module';

@Module({
  imports: [
    PrismaModule,
    AdminModule,
    SickModule,
    EncryptionModule,
    TokenModule,
    AppointmentModule,
    ArticlesModule,
    AuthenticationModule,
    EmailModule,
    OptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
