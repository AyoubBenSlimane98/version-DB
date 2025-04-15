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

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @Get()
  async getAllAppointment() {
    return await this.appointmentService.getAllAppointment();
  }
  @Post('create')
  async createAppointment(@Body() appointmentCreateDto: AppointmentCreateDto) {
    return await this.appointmentService.createAppointment(
      appointmentCreateDto,
    );
  }
  @Delete(':id')
  async deleteAppointment(@Param('id', ParseIntPipe) id: number) {
    return await this.appointmentService.deleteAppointment(id);
  }
}
