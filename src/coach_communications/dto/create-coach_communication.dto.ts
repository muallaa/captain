import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';
export class CreateCoachCommunicationDto {

      @IsOptional()
  @IsString()
  @MaxLength(255)
  whatsapp_url?: string;

  @IsString()
  @MaxLength(250)
  barcode_img: string;
}
