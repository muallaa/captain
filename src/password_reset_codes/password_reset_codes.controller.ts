import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PasswordResetCodesService } from './password_reset_codes.service';
import { CreatePasswordResetCodeDto } from './dto/create-password_reset_code.dto';
import { UpdatePasswordResetCodeDto } from './dto/update-password_reset_code.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('password-reset-codes')
export class PasswordResetCodesController {
  constructor(private readonly passwordResetCodesService: PasswordResetCodesService) {}


  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto ) {
    await this.passwordResetCodesService.forgotPassword(forgotPasswordDto);
    return { message: 'Reset code sent to email' };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto ) {
    await this.passwordResetCodesService.resetPassword(resetPasswordDto);
    return { message: 'Password reset successfully' };
  }

  @Post()
  create(@Body() createPasswordResetCodeDto: CreatePasswordResetCodeDto) {
    return this.passwordResetCodesService.create(createPasswordResetCodeDto);
  }

  @Get()
  findAll() {
    return this.passwordResetCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passwordResetCodesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasswordResetCodeDto: UpdatePasswordResetCodeDto) {
    return this.passwordResetCodesService.update(+id, updatePasswordResetCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordResetCodesService.remove(+id);
  }
}
