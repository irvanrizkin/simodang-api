import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorHandlerFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const error = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P1012':
        {
          const statusCode = HttpStatus.BAD_REQUEST;
          response.status(statusCode).json({
            statusCode,
            message: 'argument related error',
            error,
          });
        }
        break;
      case 'P2002':
        {
          const statusCode = HttpStatus.CONFLICT;
          response.status(statusCode).json({
            statusCode,
            message: 'field having unique constraint, must unique',
            error,
          });
        }
        break;
      case 'P2003':
        {
          const statusCode = HttpStatus.CONFLICT;
          response.status(statusCode).json({
            statusCode,
            message: 'field have foreign key constraint, must unique',
            error,
          });
        }
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }
}
