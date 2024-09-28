import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    readonly fromId: string;

    @IsString()
    @IsNotEmpty()
    readonly toId: string;

    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @IsString()
    @IsOptional()
    fileId: string;

    @IsString()
    @IsOptional()
    fileName: string;

    @IsBoolean()
    @IsOptional()
    isRead: boolean

}