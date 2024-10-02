import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/gaurds/auth.gaurd';
import { GatewayService } from 'src/services/gateway.service';

@Controller('messages')
@UseGuards(RolesGuard)
export class MessageController {
    constructor(private readonly gatewayService: GatewayService) { }

    @Post()
    @Roles('user')
    async createMessage(@Body() createMessageDto: any) {
        return this.gatewayService.getMessageClient().send('message_create', createMessageDto);
    }

    @Get('notifications')
    @Roles('user')
    async getNotifications(@Req() req) {
        const userId = req.user.id; // Extracted from the decoded token
        return this.gatewayService.getMessageClient().send('message_get_notifications', userId);
    }

    @Get()
    @Roles('user')
    async getMessages(
        @Query('fromId') fromId: string,
        @Query('toId') toId: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        const getMessagesDto = { fromId, toId, page, limit };
        return this.gatewayService.getMessageClient().send('message_get_messages', getMessagesDto);
    }

    @Post('upload')
    @Roles('user')
    async uploadFile(@Body() uploadFileDto: any) {
        return this.gatewayService.getMessageClient().send('message_upload_file', uploadFileDto);
    }

    @Get('download/:fileId')
    @Roles('user')
    async downloadFile(@Req() req, @Param('fileId') fileId: string) {
        const userId = req.user.id; // Extracted from the decoded token
        return this.gatewayService.getMessageClient().send('message_download_file', { userId, fileId });
    }
}
