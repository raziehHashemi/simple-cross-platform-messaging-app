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
        this.code = code;
        this.status = this.toStatus(code);
        this.errors = errors || '';
        this.message = this.toMessage(code);
    }


    private toMessage(code: ERROR): string {
        switch (code) {
            case ERROR.Internal:
                return 'validate.internal_server_error';
            case ERROR.Forbidden:
                return 'validate.forbiddon';
            case ERROR.Unauthorize:
                return 'validate.unauthorized';
            default:
                return 'validate.unknown_error';
        }
    }

    private toStatus(code: ERROR): number {
        switch (code) {
            case ERROR.Internal:
                return 500;
            case ERROR.Forbidden:
                return 403;
            case ERROR.Unauthorize:
                return 401;
        }
    }
}
