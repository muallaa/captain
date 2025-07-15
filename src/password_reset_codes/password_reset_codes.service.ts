import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePasswordResetCodeDto } from './dto/create-password_reset_code.dto';
import { UpdatePasswordResetCodeDto } from './dto/update-password_reset_code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordResetCode } from './entities/password_reset_code.entity';
import { MoreThan, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { EmailService } from 'src/services/email.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetCodesService {

  constructor(
    @InjectRepository(PasswordResetCode)
    private passwordResetCodeRepository: Repository<PasswordResetCode>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}


  async forgotPassword(forgotPasswordDto: ForgotPasswordDto ): Promise<void> {
    const { email } = forgotPasswordDto;

    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Email not found');
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration (15 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // Save reset code
    const resetCode = this.passwordResetCodeRepository.create({
      user_id: user.user_id,
      code,
      expires_at: expiresAt,
    });
    await this.passwordResetCodeRepository.save(resetCode);

    // Send email
    try {
      await this.emailService.sendResetCode(email, code);
    } catch (error) {
      throw new BadRequestException('Failed to send reset code');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto ): Promise<void> {
    const { email, code, new_password } = resetPasswordDto;

    // Find user
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Email not found');
    }

    // Find valid reset code
    const resetCode = await this.passwordResetCodeRepository.findOne({
      where: {
        user_id: user.user_id,
        code,
        expires_at: MoreThan(new Date()),
      },
    });
    if (!resetCode) {
      throw new BadRequestException('Invalid or expired reset code');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password
    await this.userRepository.update({ user_id: user.user_id }, { password: hashedPassword });

    // Delete used reset code
    await this.passwordResetCodeRepository.delete({ id: resetCode.id });
  }

  create(createPasswordResetCodeDto: CreatePasswordResetCodeDto) {
    return 'This action adds a new passwordResetCode';
  }

  findAll() {
    return `This action returns all passwordResetCodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordResetCode`;
  }

  update(id: number, updatePasswordResetCodeDto: UpdatePasswordResetCodeDto) {
    return `This action updates a #${id} passwordResetCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordResetCode`;
  }
}
