import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetMessagesDto {
    @IsString()
    @IsNotEmpty()
    fromId: string;

    @IsString()
    @IsNotEmpty()
    toId: string;

    @IsNumber()
    @IsOptional()
    page: number;

    @IsNumber()
    @IsOptional()
    limit: number;
}
