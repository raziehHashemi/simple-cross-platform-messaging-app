import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { ROLE } from 'src/enums/role.enum';

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
};
