import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nContext } from 'nestjs-i18n';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    status: number;
    message: string;
    code: number;
    errors: any;

    catch(exception: HttpException | any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const i18n = I18nContext.current(host);
        this.status = exception.status;
        this.message = i18n.t(exception.message);
        this.code = exception.code;
        this.errors = exception.errors;
        if (this.errors?.length > 0 && Array.isArray(this.errors)) {
            this.errors = this.errors.map(error => {
                return {
                    property: error.property,
                    constraints: error.constraints.map(constaint => i18n.t(constaint))
                };
            });
        }
        response.status(this.status ?? 500).json({
            timestamp: new Date().toISOString(),
            message:
                this.message
                || 'Internal Server Error',
            errors: this.errors,
            code: this.code
        });
    }
}
