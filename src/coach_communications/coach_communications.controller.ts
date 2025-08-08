import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { CoachCommunicationsService } from './coach_communications.service';
import { CreateCoachCommunicationDto } from './dto/create-coach_communication.dto';
import { UpdateCoachCommunicationDto } from './dto/update-coach_communication.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('coach-communications')
export class CoachCommunicationsController {
  constructor(private readonly coachCommunicationsService: CoachCommunicationsService) { }

  
  @UseInterceptors( 
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './Uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `qrcode-${uniqueSuffix}${ext}`);
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
  create(@Body() createCoachCommunicationDto: CreateCoachCommunicationDto, @UploadedFile(
    new ParseFilePipe({
      validators: [
        // new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
      ],
      fileIsRequired: false, // Profile picture is optional
    }),
  )
  file: Express.Multer.File,) {
    return this.coachCommunicationsService.create(createCoachCommunicationDto , file);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachCommunicationDto: UpdateCoachCommunicationDto) {
    return this.coachCommunicationsService.update(+id, updateCoachCommunicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachCommunicationsService.remove(+id);
  }

  @Get('communication')
  async communication() {

    return await this.coachCommunicationsService.communication()
  }
}
