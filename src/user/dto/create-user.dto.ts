import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';
export class CreateUserDto {

    @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  phone: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  profile_picture?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  gym_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  region?: string;

  @IsOptional()
  @IsNumber()
  sleep_hours?: number;

  @IsOptional()
  @IsNumber()
  work_hours?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  training_experience?: string;

  @IsOptional()
  @IsEnum(['Low', 'Medium', 'High'])
  work_effort?: 'Low' | 'Medium' | 'High';

  @IsOptional()
  @IsEnum(['WeightGain', 'WeightLoss', 'FatBurnMuscleBuild', 'ChampionshipPrep'])
  training_goal?: 'WeightGain' | 'WeightLoss' | 'FatBurnMuscleBuild' | 'ChampionshipPrep';

  @IsOptional()
  @IsEnum(['No', 'Yes', 'CoachDecision'])
  hormone_use?: 'No' | 'Yes' | 'CoachDecision';

  @IsOptional()
  @IsString()
  injuries?: string;

  @IsOptional()
  @IsString()
  unwanted_meal?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(['MustSubscribe', 'Pending', 'Active'])
  course_status?: 'MustSubscribe' | 'Pending' | 'Active';
}
