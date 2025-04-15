import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { SickModule } from './sick/sick.module';
import { EncryptionModule } from './encryption/encryption.module';
import { TokenModule } from './token/token.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    PrismaModule,
    AdminModule,
    SickModule,
    EncryptionModule,
    TokenModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
