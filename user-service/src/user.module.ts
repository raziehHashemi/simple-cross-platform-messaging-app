import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import configuration from './config'
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repositpry';
import { UserService } from './services/user.service';

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
        entities: [User],
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService
  ],
})
export class UserModule { }
