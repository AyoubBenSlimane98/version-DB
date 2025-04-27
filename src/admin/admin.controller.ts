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
import { ApiOperation } from '@nestjs/swagger';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('sign-up')
  @ApiOperation({
    summary: 'إنشاء حساب مسؤول جديد',
    description:
      'يقوم بإنشاء حساب مسؤول (admin) جديد باستخدام البيانات المدخلة.',
  })
  async createAdminUser(@Body() adminCreateDto: AdminCreateDto) {
    return await this.adminService.createAdminUser(adminCreateDto);
  }
  @Post('login')
  @ApiOperation({
    summary: 'تسجيل دخول مسؤول',
    description:
      'يقوم بتسجيل دخول المسؤول عن طريق البريد الإلكتروني وكلمة المرور.',
  })
  async loginAdmin(@Body() adminLoginDto: AdminLoginDto) {
    return await this.adminService.loginAdmin(adminLoginDto);
  }
  @Put('update-profil/:userId')
  @ApiOperation({
    summary: 'تحديث ملف المسؤول الشخصي',
    description:
      'يحدث معلومات الحساب الشخصي لمسؤول محدد عبر معرف المستخدم (userId).',
  })
  async updateAdminProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() adminUpdateDto: AdminUpdateDto,
  ) {
    return await this.adminService.updateAdminProfile(userId, adminUpdateDto);
  }
  @Put('update-password/:userId')
  @ApiOperation({
    summary: 'تحديث كلمة مرور المسؤول',
    description:
      'يقوم بتحديث كلمة مرور مسؤول معين باستخدام معرف المستخدم (userId).',
  })
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
