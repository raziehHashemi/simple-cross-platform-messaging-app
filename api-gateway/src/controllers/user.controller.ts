import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/gaurds/auth.gaurd';
import { GatewayService } from 'src/services/gateway.service';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly gatewayService: GatewayService) { }

    @Post()
    @Roles('admin')
    async createUser(@Body() createUserDto: any) {
        return this.gatewayService.getUserClient().send('user_create', createUserDto);
    }

    @Get(':id')
    @Roles('admin', 'user')
    async getUserById(@Param('id') id: string) {
        return this.gatewayService.getUserClient().send('user_get_by_id', id);
    }

    @Post('search')
    @Roles('admin')
    async searchUserByCredentials(@Body() credentials: { username: string; password: string }) {
        return this.gatewayService.getUserClient().send('user_search_by_credentials', credentials);
    }
}
