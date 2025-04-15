import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppointmentCreateDto } from './dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}
  async createAppointment(appointmentCreateDto: AppointmentCreateDto) {
    try {
      const { firstName, lastName, tel, time, date, numberTurnPatient } =
        appointmentCreateDto;

      const appointmentDate = new Date(date);

      const existingAppointment = await this.prisma.appointment.findFirst({
        where: {
          date: appointmentDate,
          time,
        },
      });

      if (existingAppointment) {
        return {
          success: false,
          message: `The selected time ${time} on ${appointmentDate.toDateString()} is already booked. Please choose another time.`,
        };
      }

      const appointment = await this.prisma.appointment.create({
        data: {
          firstName,
          lastName,
          tel,
          time,
          date: appointmentDate,
          numberTurnPatient,
        },
      });

      return {
        success: true,
        message: 'Appointment created successfully',
        appointment,
      };
    } catch (error) {
      console.error('Error creating appointment:', error);
      return {
        success: false,
        message:
          'An error occurred while creating the appointment. Please try again.',
      };
    }
  }
}
