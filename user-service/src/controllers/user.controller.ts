import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'src/dtos/user.dto';
import { ERROR } from 'src/enums/error.enum';
import { IUserSearchResponse } from 'src/interfaces/user-search-response.interface';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @MessagePattern('user_search_by_credentials')
    public async searchUserByCredentials(searchParams: {
        username: string;
        password: string;
    }): Promise<IUserSearchResponse> {
        let result: IUserSearchResponse;
        try {
            if (searchParams.username && searchParams.password) {
                const user = await this.userService.getByCredentials(searchParams.username, searchParams.password);

                if (user) {
                    result = {
                        status: HttpStatus.NOT_FOUND,
                        message: 'user_search_by_credentials_not_match',
                        user: null,
                    };
                } else {
                    result = {
                        status: HttpStatus.NOT_FOUND,
                        message: 'user_search_by_credentials_not_found',
                        user: null,
                    };
                }
            } else {
                result = {
                    status: HttpStatus.NOT_FOUND,
                    message: 'user_search_by_credentials_not_found',
                    user: null,
                };
            }

            return result;
        } catch (error) {
            if (error.code && error.code === ERROR.UserNotFound) {
                result = {
                    status: error.status,
                    message: 'user_search_by_credentials_not_found',
                    user: null,
                };
            }
            else {
                result = {
                    status: error.status,
                    message: 'user_search_by_credentials_internal-server-error',
                    user: null,
                };
            }
            return result;
        }

    }

    @MessagePattern('user_get_by_id')
    public async getUserById(id: string): Promise<IUserSearchResponse> {
        let result: IUserSearchResponse;

        try {
            if (id) {
                const user = await this.userService.getById(id);
                if (user) {
                    result = {
                        status: HttpStatus.OK,
                        message: 'user_get_by_id_success',
                        user,
                    };
                } else {
                    result = {
                        status: HttpStatus.NOT_FOUND,
                        message: 'user_get_by_id_not_found',
                        user: null,
                    };
                }
            } else {
                result = {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'user_get_by_id_bad_request',
                    user: null,
                };
            }

            return result;
        } catch (error) {
            if (error.code && error.code === ERROR.UserNotFound) {
                result = {
                    status: error.status,
                    message: 'user_search_by_credentials_not_found',
                    user: null,
                };
            }
            else {
                result = {
                    status: error.status,
                    message: 'user_search_by_credentials_internal-server-error',
                    user: null,
                };
            }
            return result;
        }
    }


    @MessagePattern('user_create')
    public async createUser(userParams: CreateUserDto): Promise<IUserSearchResponse> {
        let result: IUserSearchResponse;
        try {
            if (userParams) {
                const user = await this.userService.create(userParams);
                result = {
                    status: HttpStatus.CREATED,
                    message: 'user_create_success',
                    user
                };
            } else {
                result = {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'user_create_bad_request',
                    user: null,
                };
            }

            return result;
        } catch (error) {
            if (error.code && error.code === ERROR.UserNotFound) {
                result = {
                    status: error.status,
                    message: 'user_search_by_credentials_not_found',
                    user: null,
                };
            }
            else if (error.code && error.code === ERROR.Duplicate) {
                result = {
                    status: error.status,
                    message: 'user_search_by_credentials_duplicate',
                    user: null,
                };
            }
            else {
                result = {
                    status: error.status,
                    message: 'user_search_by_credentials_internal-server-error',
                    user: null,
                };
            }
            return result;
        }

    }
}