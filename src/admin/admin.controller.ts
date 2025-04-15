import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminCreateDto, AdminLoginDto } from './dto';

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
}
