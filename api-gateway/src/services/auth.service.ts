import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { GatewayService } from './gateway.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly gatewayService: GatewayService,
        private jwtService: JwtService,
    ) { }

    async validateUser(loginDto: LoginUserDto): Promise<string> {
        const userObservable = this.gatewayService.getUserClient().send('user_search_by_credentials', {
            username: loginDto.username,
            password: loginDto.password
        });

        const user = await firstValueFrom(userObservable);

        if (!user) {
            throw new UnauthorizedException();
        }

        const payload = { id: user.id, role: user.role };
        return this.jwtService.sign(payload);
    }
}
