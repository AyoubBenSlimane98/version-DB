import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

import { TokenModule } from 'src/token/token.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [TokenModule, PrismaModule, EncryptionModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
