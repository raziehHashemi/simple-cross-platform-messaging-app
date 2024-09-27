import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/user.dto";
import { ERROR } from "src/enums/error.enum";
import { DomainException } from "src/filters/domain-exception.filter";
import { UserRepository } from "src/repositories/user.repositpry";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepositoryService') private readonly userRepository: UserRepository,
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userRepository.create(createUserDto);
            return newUser;
        } catch (error) {
            if (error.code === "23505") throw new DomainException(ERROR.Duplicate);
            throw new DomainException(ERROR.Internal);
        }
    }

    async getById(id: string) {
        try {
            const user = await this.userRepository.findById(id);
            if (!user)
                throw new DomainException(ERROR.UserNotFound);
            return user;
        } catch (error) {
            if (error.status)
                throw error;
            throw new DomainException(ERROR.Internal);
        }
    }

    async getByCredentials(username: string, password: string) {
        try {
            const user = await this.userRepository.findByUsername(username);
            if (!user)
                throw new DomainException(ERROR.UserNotFound);

            if (!await bcrypt.compare(password, user.password))
                throw new DomainException(ERROR.UserNotFound);

            return user;
        } catch (error) {
            if (error.status)
                throw error;
            throw new DomainException(ERROR.Internal);
        }
    }
}