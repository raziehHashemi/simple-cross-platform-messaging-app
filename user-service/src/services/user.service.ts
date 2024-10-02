import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/user.dto";
import { UserRepository } from "src/repositories/user.repositpry";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userRepository.create(createUserDto);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string) {
        try {
            const user = await this.userRepository.findById(id);
            if (!user)
                return null;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getByCredentials(username: string, password: string) {
        try {
            const user = await this.userRepository.findByUsername(username);
            if (!user)
                return null;

            if (!await bcrypt.compare(password, user.password))
                return false;

            return user;
        } catch (error) {
            throw error;
        }
    }
}