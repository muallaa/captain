import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBodyPictureDto } from './create-user_body_picture.dto';
import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class UpdateUserBodyPictureDto extends PartialType(CreateUserBodyPictureDto) {

}
