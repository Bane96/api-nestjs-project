import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entity/document.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(Document)
        private documentRepository: Repository<Document>,
    ) {}

    async uploadDocument(filePath: string, description?: string): Promise<Document> {
        const document = this.documentRepository.create({
            url: filePath,
            description,
        });
        return await this.documentRepository.save(document);
    }

    async getAllDocuments(): Promise<Document[]> {
        return await this.documentRepository.find({ order: { createdAt: 'DESC' } });
    }

    async deleteDocument(id: number): Promise<boolean> {
        const document = await this.documentRepository.findOne({ where: { id } });
        if (!document) {
            return false;
        }
        const filePath = path.join(process.cwd(), document.url);
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error(`Failed to delete file: ${filePath}`, err);
        }
        await this.documentRepository.delete(id);
        return true;
    }
}