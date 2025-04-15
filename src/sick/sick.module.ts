import { Module } from '@nestjs/common';
import { SickController } from './sick.controller';
import { SickService } from './sick.service';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [EncryptionModule, PrismaModule, TokenModule],
  controllers: [SickController],
  providers: [SickService],
})
export class SickModule {}
