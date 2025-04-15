import { Body, Controller, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentCreateDto } from './dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @Post('create')
  async createAppointment(@Body() appointmentCreateDto: AppointmentCreateDto) {
    return await this.appointmentService.createAppointment(
      appointmentCreateDto,
    );
  }
}
