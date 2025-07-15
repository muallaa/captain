import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CourseStatusGuard } from 'src/guard/course-status.guard';
import { AdminGuard } from 'src/guard/admin.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports :[
    TypeOrmModule.forFeature([User , RefreshToken]),
 
  ],
  
  controllers: [UserController],
  providers: [UserService , JwtAuthGuard , CourseStatusGuard , AdminGuard],
})
export class UserModule {}
