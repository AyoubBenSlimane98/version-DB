import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OptModule } from 'src/opt/opt.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [OptModule, EmailModule],
  providers: [PrismaService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
