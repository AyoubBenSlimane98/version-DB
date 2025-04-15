import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EncryptionService } from 'src/encryption/encryption.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import {
  AdminCreateDto,
  AdminLoginDto,
  AdminPasswordDto,
  AdminUpdateDto,
} from './dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
    private readonly tokenService: TokenService,
  ) {}

  async createAdminUser(adminCreateDto: AdminCreateDto) {
    try {
      const { firstName, lastName, sexe, email, password } = adminCreateDto;

      const existingAccount = await this.prisma.account.findUnique({
        where: { email },
      });

      if (existingAccount) {
        return {
          success: false,
          message: 'Email already in use. Please try another one.',
        };
      }

      const hashedPassword =
        await this.encryptionService.hashPassword(password);

      return await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: { firstName, lastName, sexe },
        });

        await tx.account.create({
          data: {
            email,
            password: hashedPassword,
            userId: user.id,
          },
        });

        await tx.admin.create({
          data: {
            userId: user.id,
          },
        });

        const tokens = await this.tokenService.getTokens(user.id, email);

        return {
          accountCreated: true,
          message: 'Admin created successfully',
          tokens,
        };
      });
    } catch (error) {
      console.error('Error creating admin:', error);
      return {
        success: false,
        message:
          'An error occurred while creating the admin. Please try again.',
      };
    }
  }

  async loginAdmin(adminLoginDto: AdminLoginDto) {
    const { email, password } = adminLoginDto;
    const account = await this.prisma.account.findUnique({
      where: { email },
      include: {
        user: {
          include: {
            admin: true,
          },
        },
      },
    });

    if (!account) throw new UnauthorizedException('Invalid credentials');

    const passwordValid = await this.encryptionService.comparePasswords(
      password,
      account.password,
    );

    if (!passwordValid)
      throw new UnauthorizedException(
        'Invalid credentials ,you are not an Admin user',
      );
    const tokens = await this.tokenService.getTokens(account.userId, email);
    return {
      message: 'Admin login successful',
      tokens,
    };
  }

  async updateAdminProfile(userId: number, adminUpdateDto: AdminUpdateDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Admin not found!');
    }
    console.log(adminUpdateDto);
    const updatedProfile = await this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: adminUpdateDto.firstName,
        lastName: adminUpdateDto.lastName,
        sexe: adminUpdateDto.sexe,
      },
    });

    return {
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile,
    };
  }

  async updateAdminPassword(
    userId: number,
    adminPasswordDto: AdminPasswordDto,
  ) {
    const { oldPassword, newPassword } = adminPasswordDto;

    const account = await this.prisma.account.findUnique({
      where: { userId },
    });

    if (!account) {
      throw new NotFoundException('Account not found!');
    }

    const isMatch = await this.encryptionService.comparePasswords(
      oldPassword,
      account.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect!');
    }

    const hashedPassword =
      await this.encryptionService.hashPassword(newPassword);

    await this.prisma.account.update({
      where: { id: account.id },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      message: 'Password updated successfully',
    };
  }
}
