import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, UploadedFile, ParseFilePipe, MaxFileSizeValidator, Put } from '@nestjs/common';
import { SubscriptionPackagesService } from './subscription_packages.service';
import { CreateSubscriptionPackageDto } from './dto/create-subscription_package.dto';
import { UpdateSubscriptionPackageDto } from './dto/update-subscription_package.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('subscription-packages')
export class SubscriptionPackagesController {
  constructor(private readonly subscriptionPackagesService: SubscriptionPackagesService) { }


  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './Uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `package-${uniqueSuffix}${ext}`);
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
  @Post()
  create(@Body() createSubscriptionPackageDto: CreateSubscriptionPackageDto, @UploadedFile(
    new ParseFilePipe({
      validators: [
        // new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
      ],
      fileIsRequired: false, // Profile picture is optional
    }),
  )
  image: Express.Multer.File,) {
    return this.subscriptionPackagesService.create(createSubscriptionPackageDto, image);
  }

  @Get()
  findAll() {
    return this.subscriptionPackagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionPackagesService.findOne(+id);
  }

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './Uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `package-${uniqueSuffix}${ext}`);
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
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionPackageDto: UpdateSubscriptionPackageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
        fileIsRequired: false,
      }),
    )
    image?: Express.Multer.File,
  ) {
    return this.subscriptionPackagesService.update(+id, updateSubscriptionPackageDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionPackagesService.remove(+id);
  }
}
