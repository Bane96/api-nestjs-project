import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Body,
    HttpStatus,
    HttpCode,
    Req,
    Delete,
    Param,
    NotFoundException,
    Get, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DocumentService } from './document.service';
import { extname } from 'path';
import { Request } from 'express';

@Controller('documents')
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/documents',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    @HttpCode(HttpStatus.CREATED)
    async uploadDocument(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: Request,
        @Body('description') description?: string,
    ) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        const filePath = `/uploads/documents/${file.filename}`;
        const document = await this.documentService.uploadDocument(filePath, description);

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const absoluteUrl = `${baseUrl}${document.url.startsWith('/') ? '' : '/'}${document.url}`;

        return {
            ...document,
            url: absoluteUrl,
        };
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getDocuments(@Req() req: Request) {
        const documents = await this.documentService.getAllDocuments();
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        return documents.map(document => ({
            ...document,
            url: `${baseUrl}${document.url.startsWith('/') ? '' : '/'}${document.url}`,
        }));
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteDocument(@Param('id') id: number) {
        const deleted = await this.documentService.deleteDocument(id);
        if (!deleted) {
            throw new NotFoundException(`Document with id ${id} not found`);
        }
    }
}