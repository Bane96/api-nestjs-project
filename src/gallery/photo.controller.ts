import {
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
    Body,
    HttpStatus,
    HttpCode,
    Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PhotoService } from './photo.service';
import { extname } from 'path';
import { Request } from 'express';

@Controller('photos')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/photos',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    @HttpCode(HttpStatus.CREATED)
    async uploadPhoto(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: Request,
        @Body('description') description?: string,
    ) {
        const filePath = `/uploads/photos/${file.filename}`;
        const photo = await this.photoService.uploadPhoto(filePath, description);

        // Construct the absolute URL
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const absoluteUrl = `${baseUrl}${photo.url.startsWith('/') ? '' : '/'}${photo.url}`;

        return {
            ...photo,
            url: absoluteUrl,
        };
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getPhotos(@Req() req: Request) {
        const photos = await this.photoService.getAllPhotos();
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        // Map each photo to include the absolute URL
        return photos.map(photo => ({
            ...photo,
            url: `${baseUrl}${photo.url.startsWith('/') ? '' : '/'}${photo.url}`,
        }));
    }
}