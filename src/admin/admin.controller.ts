import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  AdminCreateDto,
  AdminLoginDto,
  AdminPasswordDto,
  AdminUpdateDto,
} from './dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('sign-up')
  async createAdminUser(@Body() adminCreateDto: AdminCreateDto) {
    return await this.adminService.createAdminUser(adminCreateDto);
  }
  @Post('login')
  async loginAdmin(@Body() adminLoginDto: AdminLoginDto) {
    return await this.adminService.loginAdmin(adminLoginDto);
  }
  @Put('update-profil/:userId')
  async updateAdminProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() adminUpdateDto: AdminUpdateDto,
  ) {
    return await this.adminService.updateAdminProfile(userId, adminUpdateDto);
  }
  @Put('update-password/:userId')
  async updateAdminPassword(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() adminPasswordDto: AdminPasswordDto,
  ) {
    return await this.adminService.updateAdminPassword(
      userId,
      adminPasswordDto,
    );
  }
}
