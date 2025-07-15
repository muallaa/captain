import { Module } from '@nestjs/common';
import { PasswordResetCodesService } from './password_reset_codes.service';
import { PasswordResetCodesController } from './password_reset_codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetCode } from './entities/password_reset_code.entity';
import { User } from 'src/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from 'src/services/email.service';

@Module({

   imports: [
    TypeOrmModule.forFeature([PasswordResetCode, User]),
    ConfigModule,
  ],

  controllers: [PasswordResetCodesController],
  providers: [PasswordResetCodesService , EmailService],
  exports : [PasswordResetCodesService]
})
export class PasswordResetCodesModule {}
