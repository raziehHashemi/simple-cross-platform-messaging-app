import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { MessageRepository } from 'src/repositories/message.repository';
import { CreateMessageDto } from 'src/dtos/create-message.dto';

@Injectable()
export class MessageService {
    private readonly fileStoragePath: string;

    constructor(
        private readonly messageRepository: MessageRepository,
        private readonly configService: ConfigService,
    ) {
        this.fileStoragePath = path.join(__dirname, this.configService.get('storage').directory, 'storage');
        if (!fs.existsSync(this.fileStoragePath)) {
            fs.mkdirSync(this.fileStoragePath, { recursive: true });
        }
    }

    async createMessage(createMessageDto: CreateMessageDto) {
        try {
            const newMessage = await this.messageRepository.create(createMessageDto);
            return newMessage;
        } catch (error) {
            throw error;
        }
    }

    async getMessages(fromId: string, toId: string, page = 1, limit = 10) {
        try {
            const messages = await this.messageRepository.findMessages(fromId, toId, page, limit);

            // Mark only fetched messages as read
            const messageIds = messages.map((message) => message.id);
            await this.messageRepository.markMessagesAsRead(messageIds);

            return {
                data: messages,
                total: messages.length,
                page,
                lastPage: Math.ceil(messages.length / limit),
            };
        } catch (error) {
            throw error;
        }
    }

    async getNotifications(userId: string) {
        try {
            const unreadCount = await this.messageRepository.getUnreadCount(userId);
            return unreadCount;
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(fileBuffer: Buffer, originalFileName: string, fromId: string, toId: string) {
        try {
            const uniqueId = uuidv4();
            const fileExtension = path.extname(originalFileName);
            const storedFileName = `${uniqueId}${fileExtension}`;
            const filePath = path.join(this.fileStoragePath, storedFileName);

            fs.writeFileSync(filePath, fileBuffer);

            return {
                fileName: storedFileName,
                fileId: uniqueId
            };
        } catch (error) {
            throw error;
        }
    }

    async downloadFile(userId: string, fileId: string) {
        try {
            const message = await this.messageRepository.findByFileId(fileId)

            if (!message) {
                throw new NotFoundException('File not found');
            }

            if (message.fromId !== userId || message.toId !== userId) {
                throw new ForbiddenException('You do not have permission to access this file');
            }

            const filePath = path.join(this.fileStoragePath, `${message.fileId}${path.extname(message.fileName)}`);

            if (!fs.existsSync(filePath)) {
                throw new NotFoundException('File does not exist in storage');
            }

            return {
                fileBuffer: fs.readFileSync(filePath),
                fileName: message.fileName,
            };
        } catch (error) {
            throw error;
        }
    }
}
