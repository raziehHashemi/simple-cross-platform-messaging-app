import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageController } from './controllers/message.controller';
import { MessageRepository } from './repositories/message.repository';
import { MessageService } from './services/message.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration]
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
				type: 'postgres',
				host: configService.get('database.host'),
				port: configService.get('database.port'),
				username: configService.get('database.username'),
				password: configService.get('database.password'),
				database: configService.get('database.database'),
				migrationsRun: configService.get('database.migrationsRun'),
				synchronize: configService.get('database.synchronize'),
				entities: [Message],
			}),
		}),
	],
	controllers: [MessageController],
	providers: [
		MessageRepository,
		MessageService
	],
})
export class MessageModule { }
