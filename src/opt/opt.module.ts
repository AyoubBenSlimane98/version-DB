import { Module } from '@nestjs/common';
import { OptService } from './opt.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [OptService],
  exports: [OptService],
  imports: [PrismaModule],
})
export class OptModule {}
