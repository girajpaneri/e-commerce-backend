// http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Check if the request and response are defined
    if (!request || !response) {
      this.logger.error('Request or Response object is not available');
      return;
    }

    const status = exception.getStatus();
    const message = exception.message || 'An unexpected error occurred';

    // Log the exception details
    this.logger.error(`HTTP Exception: ${message}`, exception.stack);

    // Create a custom error response
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url || 'Unknown path', // Fallback if `request.url` is undefined
      message,
    };

    response
      .status(status)
      .json(errorResponse);
  }
}
