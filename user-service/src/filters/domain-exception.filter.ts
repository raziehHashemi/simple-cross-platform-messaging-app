import { Catch } from "@nestjs/common";
import { ERROR } from "src/enums/error.enum";
import { HttpExceptionFilter } from "./http-exception.filter";

@Catch()
export class DomainException extends HttpExceptionFilter {
    status: number;
    message: string;
    code: number;
    errors: any;


    constructor(
        code: ERROR,
        errors?: any
    ) {
        super();

        this.status = this.toStatus(code);
        this.errors = errors || '';
        this.message = this.toMessage(code);
    }


    private toMessage(code: ERROR): string {
        switch (code) {
            case ERROR.Validation:
                return 'validate.validation_error';
            case ERROR.Internal:
                return 'validate.internal_server_error';
            case ERROR.UserNotFound:
                return 'validate.user_not_found';
            case ERROR.Duplicate:
                return 'validate.duplicate_user';
            default:
                return 'validate.unknown_error';
        }
    }

    private toStatus(code: ERROR): number {
        switch (code) {
            case ERROR.Validation:
                return 422;
            case ERROR.Internal:
                return 500;
            case ERROR.UserNotFound:
                return 404;
            case ERROR.Duplicate:
                return 409;
        }
    }
}
