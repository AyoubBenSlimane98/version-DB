import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SickCreateDto, SickLoginDto } from './dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class SickService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
    private readonly tokenService: TokenService,
  ) {}

  async createSickUser(sickCreateDto: SickCreateDto) {
    try {
      const { firstName, lastName, sexe, tel, email, password } = sickCreateDto;
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

        await tx.sick.create({
          data: {
            userId: user.id,
            tel,
          },
        });

        const tokens = await this.tokenService.getTokens(user.id, email);

        return {
          accountCreated: true,
          message: 'Sick user created successfully',
          tokens,
        };
      });
    } catch (error) {
      console.error('Error creating Sick user:', error);
      return {
        success: false,
        message:
          'An error occurred while creating the sick user. Please try again.',
      };
    }
  }

  async loginSick(sickLoginDto: SickLoginDto) {
    const { email, password } = sickLoginDto;
    const account = await this.prisma.account.findUnique({
      where: { email },
      include: {
        user: {
          include: {
            Sick: true,
          },
        },
      },
    });

    if (!account)
      throw new UnauthorizedException(
        'Invalid credentials, you are not a Sick user',
      );

    const passwordValid = await this.encryptionService.comparePasswords(
      password,
      account.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException(
        'Invalid credentials, you are not a Sick user',
      );
    }

    const tokens = await this.tokenService.getTokens(account.userId, email);

    return {
      message: 'Sick login successful',
      tokens,
    };
  }
}
