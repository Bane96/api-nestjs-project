import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../entity/photo.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private photoRepository: Repository<Photo>,
    ) {}

    async uploadPhoto(filePath: string, description?: string): Promise<Photo> {
        const photo = this.photoRepository.create({
            url: filePath,
            description,
        });
        return await this.photoRepository.save(photo);
    }

    async getAllPhotos(): Promise<Photo[]> {
        return await this.photoRepository.find({ order: { createdAt: 'DESC' } });
    }

    async deletePhoto(id: number): Promise<boolean> {
        const photo = await this.photoRepository.findOne({ where: { id } });
        if (!photo) {
            return false;
        }
        const filePath = path.join(process.cwd(), photo.url);
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error(`Failed to delete file: ${filePath}`, err);
        }
        await this.photoRepository.delete(id);
        return true;
    }
}
