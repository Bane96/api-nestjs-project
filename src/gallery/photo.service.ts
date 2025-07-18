import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../entity/photo.entity';

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
}
