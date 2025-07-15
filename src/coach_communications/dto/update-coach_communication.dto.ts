import { PartialType } from '@nestjs/mapped-types';
import { CreateCoachCommunicationDto } from './create-coach_communication.dto';
import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class UpdateCoachCommunicationDto extends PartialType(CreateCoachCommunicationDto) {

      @IsOptional()
  @IsString()
  @MaxLength(255)
  whatsapp_url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  barcode_img?: string;
}
