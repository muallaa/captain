import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, UseInterceptors, BadRequestException, UploadedFiles, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, Request, ForbiddenException, ParseIntPipe, UploadedFile } from '@nestjs/common';
import { UserBodyPicturesService } from './user_body_pictures.service';
import { CreateUserBodyPictureDto } from './dto/create-user_body_picture.dto';
import { UpdateUserBodyPictureDto } from './dto/update-user_body_picture.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user-body-pictures')
export class UserBodyPicturesController {
  constructor(private readonly userBodyPicturesService: UserBodyPicturesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors( 
    FilesInterceptor('body_pictures', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `body-picture-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new BadRequestException('Only PNG, JPEG, or JPG files are allowed'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
    }),
  )
  async create(
    @Body() createUserBodyPictureDto: CreateUserBodyPictureDto,
    @UploadedFiles( 
      new ParseFilePipe({
        validators: [
          // new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        ],
        fileIsRequired: true,
      }),
    )
    files: Express.Multer.File[],
    @Request() req: any,
  ) {
    const pictures = await this.userBodyPicturesService.create(createUserBodyPictureDto, files, req.user);
    return { message: 'Body pictures uploaded successfully', pictures };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req: any) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can view all body pictures');
    }
    return await this.userBodyPicturesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) 
  async findOne(@Param('id',  ParseIntPipe) id: number, @Request() req: any) {
    const picture = await this.userBodyPicturesService.findOne(id);
    if (req.user.role !== 'admin' && req.user.sub !== picture.user_id) {
      throw new ForbiddenException('You can only view your own body pictures');
    }
    return picture;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors( 
    FileInterceptor('body_picture', {
      storage: diskStorage({
        destination: './Uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `body-picture-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new BadRequestException('Only PNG, JPEG, or JPG files are allowed'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Request() req: any,
  ) {
    const updatedPicture = await this.userBodyPicturesService.update(id, file, req.user);
    return { message: 'Body picture updated successfully', picture: updatedPicture };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return await this.userBodyPicturesService.remove(id, req.user);
  }
}
