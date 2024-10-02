import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controllers/user.controller';
import { MessageController } from './controllers/message.controller';
import { GatewayService } from './services/gateway.service';

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get('auth.secret'),
					signOptions: {
						expiresIn: configService.get('auth.expirationTime'),
					},
				};
			},
			inject: [ConfigService],
		}),
	],
	controllers: [UserController, MessageController],
	providers: [GatewayService],
})
export class AppModule { }
