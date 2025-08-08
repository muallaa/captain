import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, SetMetadata, Request, ParseIntPipe, ForbiddenException, UseInterceptors, BadRequestException, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CourseStatusGuard } from 'src/guard/course-status.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


   @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto);
  }

    @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

 
 @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
   
    return await this.userService.refresh(refreshTokenDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req: any) {
    return await this.userService.logout(req.user.sub);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, CourseStatusGuard)
  // @SetMetadata('course_statuses', ['Active', 'Pending'])
  async getProfile(@Request() req: any) {
    return await this.userService.profile(req.user.sub)
  }


  
   @Get('monthly-status-count')
  async getUserMonthlyStatusCounts() {
    return await this.userService.getUserMonthlyStatusCounts();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  


  @Patch('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors( 
    FileInterceptor('profile_picture', {
      storage: diskStorage({
        destination: './Uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `profile-picture-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new BadRequestException('Only PNG, JPEG, or JPG files are allowed'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  async update(
    // @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile( 
      new ParseFilePipe({
        validators: [ 
          // new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        ],
        fileIsRequired: false, // Profile picture is optional
      }),
    )
    file: Express.Multer.File,
    @Request() req: any,
  ) {
    const updatedUser = await this.userService.update(req.user.sub, updateUserDto, req.user, file);
    return { message: 'User updated successfully', user: updatedUser };
  }


  

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    if (req.user.role !== 'admin') {
      throw new  ForbiddenException('Only admins can delete users');
    }
    return await this.userService.remove(id);
  }

  @Delete('/cancle_subscripe/:id')
  async cancle(
    @Param('id' , ParseIntPipe) id : number
  ){
    return await this.userService.cancle_subscripe(id)
  }
  


}
