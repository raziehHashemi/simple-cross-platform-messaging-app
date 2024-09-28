import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMessageDto } from 'src/dtos/create-message.dto';
import { GetMessagesDto } from 'src/dtos/get-messages.dto';
import { UploadFileDto } from 'src/dtos/upload-file.dto';
import { MessageService } from 'src/services/message.service';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @MessagePattern('message_create')
    public async createMessage(createMessageDto: CreateMessageDto) {
        try {
            const message = await this.messageService.createMessage(createMessageDto);
            return {
                status: HttpStatus.CREATED,
                message: 'message_create_success',
                data: message,
            };
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'message_create_failed',
                error: error.message,
            };
        }
    }

    @MessagePattern('message_get_notifications')
    public async getNotifications(userId: string) {
        try {
            const unreadCount = await this.messageService.getNotifications(userId);
            return {
                status: HttpStatus.OK,
                message: 'message_get_notifications_success',
                data: unreadCount,
            };
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'message_get_notifications_failed',
                error: error.message,
            };
        }
    }

    @MessagePattern('message_get_messages')
    public async getMessages(getMessagesDto: GetMessagesDto) {
        try {
            const { fromId, toId, page, limit } = getMessagesDto;
            const messages = await this.messageService.getMessages(fromId, toId, page, limit);

            return {
                status: HttpStatus.OK,
                message: 'message_get_messages_success',
                data: messages,
            };
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'message_get_messages_failed',
                error: error.message,
            };
        }
    }

    @MessagePattern('message_upload_file')
    public async uploadFile(uploadFileDto: UploadFileDto) {
        try {
            const { fileBuffer, fileName, fromId, toId } = uploadFileDto;
            const fileMessage = await this.messageService.uploadFile(fileBuffer, fileName, fromId, toId);

            return {
                status: HttpStatus.CREATED,
                message: 'message_upload_file_success',
                data: fileMessage,
            };
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'message_upload_file_failed',
                error: error.message,
            };
        }
    }

    @MessagePattern('message_download_file')
    public async downloadFile(userId: string, fileId: string) {
        try {
            const fileData = await this.messageService.downloadFile(userId, fileId);
            return {
                status: HttpStatus.OK,
                message: 'message_download_file_success',
                data: fileData,
            };
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'message_download_file_failed',
                error: error.message,
            };
        }
    }
}
