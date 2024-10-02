import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMessageDto } from "src/dtos/create-message.dto";
import { Message } from "src/entities/message.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class MessageRepository {
    constructor(
        @InjectRepository(Message)
        private messageModel: Repository<Message>,
    ) { }

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        try {
            const mappedFields: Partial<Message> = {};
            for (const key of Object.keys(createMessageDto)) {
                mappedFields[key] = createMessageDto[key];
            }
            const newMessage = await this.messageModel.save(mappedFields);
            return newMessage;
        } catch (error) {
            throw error;
        }
    }

    async findMessages(fromId: string, toId: string, page: number, limit: number): Promise<Message[]> {
        try {
            return await this.messageModel.find({
                where: { fromId, toId },
                skip: (page - 1) * limit,
                take: limit,
                order: { createdAt: 'DESC' },
            });
        } catch (error) {
            throw error;
        }
    }

    async getUnreadCount(userId: string): Promise<number> {
        try {
            return await this.messageModel.count({ where: { toId: userId, isRead: false } });
        } catch (error) {
            throw error;
        }
    }

    async markMessagesAsRead(ids: string[]): Promise<void> {
        try {
            await this.messageModel.update(
                { id: In(ids) },
                { isRead: true },
            );
        } catch (error) {
            throw error;
        }
    }

    async findByFileId(fileId: string): Promise<Message | null> {
        try {
            return await this.messageModel.findOne({ where: { fileId } });
        } catch (error) {
            throw error;
        }
    }
}
