import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: CreateUserDto): Promise<{ token: string }> {
        const token = await this.authService.validateUser(loginDto);
        if (!token) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return { token };
    }
}
