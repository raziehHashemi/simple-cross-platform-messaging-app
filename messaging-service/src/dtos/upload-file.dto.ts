import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UploadFileDto {
    @IsNotEmpty()
    @IsString()
    fromId: string;

    @IsNotEmpty()
    @IsString()
    toId: string;

    @IsNotEmpty()
    @IsString()
    fileName: string;

    @IsNotEmpty()
    @IsString()
    fileBuffer: Buffer;
}
