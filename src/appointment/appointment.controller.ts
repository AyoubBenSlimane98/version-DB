import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentCreateDto } from './dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('إدارة المواعيد')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @Get('all')
  @ApiOperation({
    summary: 'جلب جميع المواعيد',
    description: 'هذه العملية تقوم بجلب جميع المواعيد الموجودة في النظام.',
  })
  async getAllAppointment() {
    return await this.appointmentService.getAllAppointment();
  }

  @Post('create')
  @ApiOperation({
    summary: 'إنشاء موعد جديد',
    description:
      'هذه العملية تقوم بإنشاء موعد جديد عن طريق إرسال بيانات الموعد.',
  })
  async createAppointment(@Body() appointmentCreateDto: AppointmentCreateDto) {
    return await this.appointmentService.createAppointment(
      appointmentCreateDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'حذف موعد',
    description: 'هذه العملية تقوم بحذف موعد محدد عبر معرف الموعد (ID).',
  })
  @ApiParam({ name: 'id', description: 'معرف الموعد الذي تريد حذفه' })
  async deleteAppointment(@Param('id', ParseIntPipe) id: number) {
    return await this.appointmentService.deleteAppointment(id);
  }
}
