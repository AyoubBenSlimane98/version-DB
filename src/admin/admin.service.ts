import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EncryptionService } from 'src/encryption/encryption.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import { AdminCreateDto, AdminLoginDto } from './dto';

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
            Admin: true,
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
}
