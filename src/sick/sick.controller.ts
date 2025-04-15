import { Body, Controller, Post } from '@nestjs/common';
import { SickService } from './sick.service';
import { SickCreateDto, SickLoginDto } from './dto';

@Controller('sick')
export class SickController {
  constructor(private readonly sickService: SickService) {}

  @Post('sign-up')
  async createSickUser(@Body() sickCreateDto: SickCreateDto) {
    return await this.sickService.createSickUser(sickCreateDto);
  }
  @Post('login')
  async loginSick(@Body() sickLoginDto: SickLoginDto) {
    return await this.sickService.loginSick(sickLoginDto);
  }
}
