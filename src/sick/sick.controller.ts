import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SickService } from './sick.service';
import { SickCreateDto, SickLoginDto } from './dto';

@Controller('sick')
export class SickController {
  constructor(private readonly sickService: SickService) {}
  @Get()
  async getAllSick() {
    return await this.sickService.getAllSick();
  }
  @Post('sign-up')
  async createSickUser(@Body() sickCreateDto: SickCreateDto) {
    return await this.sickService.createSickUser(sickCreateDto);
  }
  @Post('login')
  async loginSick(@Body() sickLoginDto: SickLoginDto) {
    return await this.sickService.loginSick(sickLoginDto);
  }
  @Delete('delete-sick-user/:userId')
  async deleteSickUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.sickService.deleteSickUser(userId);
  }
}
