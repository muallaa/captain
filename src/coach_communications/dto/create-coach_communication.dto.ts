import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';
export class CreateCoachCommunicationDto {


  @IsOptional()
  name: string

  @IsOptional()
  email: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  phone?: string;

  @IsString()
  @MaxLength(250)
  @IsOptional()
  barcode_img: string;
}
