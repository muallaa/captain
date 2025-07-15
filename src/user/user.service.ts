import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {

  // CONSTRUCTOR
  constructor(
    @InjectRepository(User) private userRepository : Repository<User>,
     @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
    private  jwtService: JwtService,
  ){}


  // REGESTER USER

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password, phone , role } = registerUserDto;

    // Check if email already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || 'user', 
      course_status: 'MustSubscribe', // Default value
    });

    // Save user to database
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Failed to register user');
    }
  }


  // LOG IN 

  
  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = loginUserDto;

    // Find user
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    // Generate access token
    const payload = { sub: user.user_id, role: user.role, course_status: user.course_status };
    const access_token = await this.jwtService.signAsync(payload);

    // Generate refresh token
    const refreshToken = uuidv4();
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

    // Invalidate existing refresh tokens for the user
    await this.refreshTokenRepository.delete({ user_id: user.user_id });

    // Save new refresh token
    const refreshTokenEntity = this.refreshTokenRepository.create({
      token: refreshTokenHash,
      expires_at: expiresAt,
      user_id: user.user_id,
      user : user
    });
    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { access_token, refresh_token: refreshToken };
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
   
    
    const { refresh_token } = refreshTokenDto;

    // Find refresh token
    const refreshTokenEntity = await this.refreshTokenRepository.findOne({
      where: { expires_at: MoreThanOrEqual(new Date()) },
      relations: ['user'],
    });

    if (!refreshTokenEntity) {
      throw new UnauthorizedException('Invalid or expired refresh token');
      console.log('asd')
    }

    // Verify refresh token
    const isTokenValid = await bcrypt.compare(refresh_token, refreshTokenEntity.token);
    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
      
    }

    // Generate new access token
    const payload = {
      sub: refreshTokenEntity.user.user_id,
      role: refreshTokenEntity.user.role,
      course_status: refreshTokenEntity.user.course_status,
    };
    const access_token = await this.jwtService.signAsync(payload);

    // Generate new refresh token
    const newRefreshToken = uuidv4();
    const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Update existing refresh token
    refreshTokenEntity.token = newRefreshTokenHash;
    refreshTokenEntity.expires_at = expiresAt;
    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { access_token, refresh_token: newRefreshToken };
  
  }

  async logout(userId: number): Promise<void> {
    // Invalidate all refresh tokens for the user
    await this.refreshTokenRepository.delete({ user_id: userId });
  }

  async profile(userId) {

    const userProfile = await this.userRepository.findOne({ where : {user_id : userId} , relations : ['body_pictures']})

    return userProfile
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  
async update(id: number, updateUserDto: UpdateUserDto, currentUser: { sub: number; role: string }, file?: Express.Multer.File) {
   

    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.userRepository.findOne({ where: { email: updateUserDto.email } });
      if (existingEmail) {
        throw new ConflictException('Email already in use');
      }
    }

    const updateData: Partial<User> = {};
    if (updateUserDto.name) updateData.name = updateUserDto.name;
    if (updateUserDto.email) updateData.email = updateUserDto.email;
    if (updateUserDto.phone) updateData.phone = updateUserDto.phone;
    if (updateUserDto.password) updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    if (file) updateData.profile_picture = file.path.replace(/\\/g, '/'); // Normalize path
    else if (updateUserDto.profile_picture) updateData.profile_picture = updateUserDto.profile_picture;
    if (updateUserDto.weight !== undefined) updateData.weight = updateUserDto.weight;
    if (updateUserDto.height !== undefined) updateData.height = updateUserDto.height;
    if (updateUserDto.age !== undefined) updateData.age = updateUserDto.age;
    if (updateUserDto.gym_name) updateData.gym_name = updateUserDto.gym_name;
    if (updateUserDto.region) updateData.region = updateUserDto.region;
    if (updateUserDto.sleep_hours !== undefined) updateData.sleep_hours = updateUserDto.sleep_hours;
    if (updateUserDto.work_hours !== undefined) updateData.work_hours = updateUserDto.work_hours;
    if (updateUserDto.training_experience) updateData.training_experience = updateUserDto.training_experience;
    if (updateUserDto.work_effort) updateData.work_effort = updateUserDto.work_effort;
    if (updateUserDto.training_goal) updateData.training_goal = updateUserDto.training_goal;
    if (updateUserDto.hormone_use) updateData.hormone_use = updateUserDto.hormone_use;
    if (updateUserDto.injuries) updateData.injuries = updateUserDto.injuries;
    if (updateUserDto.unwanted_meal) updateData.unwanted_meal = updateUserDto.unwanted_meal;
    if (updateUserDto.notes) updateData.notes = updateUserDto.notes;
    if (updateUserDto.course_status && currentUser.role === 'admin') updateData.course_status = updateUserDto.course_status;
    if (updateUserDto.role && currentUser.role === 'admin') updateData.role = updateUserDto.role;

    await this.userRepository.update({ user_id: id }, updateData);
    return await this.userRepository.findOne({ where: { user_id: id } });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepository.delete({ user_id: id });
    return { message: 'User deleted successfully' };
  }

}
