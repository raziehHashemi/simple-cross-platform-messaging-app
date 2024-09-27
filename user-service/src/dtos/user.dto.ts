import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { ROLE } from 'src/enums/role.enum';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsEnum(ROLE)
    role: ROLE;
}