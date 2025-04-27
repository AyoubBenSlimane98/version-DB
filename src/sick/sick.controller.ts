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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('المرضى')
@Controller('sick')
export class SickController {
  constructor(private readonly sickService: SickService) {}
  @Get()
  @ApiOperation({
    summary: 'الحصول على جميع المرضى',
    description: 'تقوم هذه العملية بإرجاع جميع المرضى المسجلين في النظام.',
  })
  @ApiResponse({
    status: 200,
    description: 'تم استرجاع جميع المرضى بنجاح.',
  })
  async getAllSick() {
    return await this.sickService.getAllSick();
  }
  @Post('sign-up')
  @ApiOperation({
    summary: 'تسجيل مستخدم مريض جديد',
    description: 'تقوم هذه العملية بتسجيل مريض جديد باستخدام البيانات المدخلة.',
  })
  @ApiBody({
    description: 'بيانات المريض الجديد',
    type: SickCreateDto,
  })
  @ApiResponse({
    status: 201,
    description: 'تم إنشاء حساب المريض بنجاح.',
  })
  async createSickUser(@Body() sickCreateDto: SickCreateDto) {
    return await this.sickService.createSickUser(sickCreateDto);
  }
  @Post('login')
  @ApiOperation({
    summary: 'تسجيل دخول المريض',
    description:
      'تقوم هذه العملية بالتحقق من بيانات دخول المريض (البريد الإلكتروني وكلمة المرور).',
  })
  @ApiBody({
    description: 'بيانات تسجيل الدخول',
    type: SickLoginDto,
  })
  @ApiResponse({
    status: 200,
    description: 'تم تسجيل الدخول بنجاح.',
  })
  @ApiResponse({
    status: 401,
    description: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
  })
  async loginSick(@Body() sickLoginDto: SickLoginDto) {
    return await this.sickService.loginSick(sickLoginDto);
  }

  @Delete('delete-sick-user/:userId')
  @ApiOperation({
    summary: 'حذف مريض',
    description: 'تقوم هذه العملية بحذف مريض باستخدام معرف المستخدم.',
  })
  @ApiResponse({
    status: 200,
    description: 'تم حذف المريض بنجاح.',
  })
  @ApiResponse({
    status: 404,
    description: 'المريض غير موجود.',
  })
  async deleteSickUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.sickService.deleteSickUser(userId);
  }
}
