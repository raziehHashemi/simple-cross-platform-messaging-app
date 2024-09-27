import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dtos/user.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userModel: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const mappedFields: Partial<User> = {};
            for (const key of Object.keys(createUserDto)) {
                mappedFields[key] = createUserDto[key];
            }
            const newUser = await this.userModel.save(mappedFields);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string): Promise<User | null> {
        try {
            const user = await this.userModel.findOne({ where: { id } });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findByUsername(username: string): Promise<User | null> {
        try {
            const user = await this.userModel.findOne({ where: { id: username } });
            return user;
        } catch (error) {
            throw error;
        }
    }
}