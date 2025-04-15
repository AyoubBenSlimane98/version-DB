import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppointmentCreateDto } from './dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}
  async getAllAppointment() {
    try {
      return await this.prisma.appointment.findMany({});
    } catch (error) {
      console.warn('Failed to fetch appointments:', error);
      throw new Error('Failed to fetch appointments');
    }
  }

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

  async deleteAppointment(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    await this.prisma.appointment.delete({
      where: { id },
    });
    return {
      message: `Succes an appointment is deleted `,
    };
  }
}
