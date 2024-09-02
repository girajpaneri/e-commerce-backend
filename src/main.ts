import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/model/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

    // Apply global pipes and filters
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // Automatically strip properties that do not have decorators
      forbidNonWhitelisted: true, // Throw an error if properties do not have decorators
      transform: true, // Automatically transform payloads to DTO instances
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
  
  // // Enable validation pipe
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true, // Strip properties that do not have decorators
  //   forbidNonWhitelisted: true, // Throw an error if properties do not have decorators
  //   transform: true, // Automatically transform payloads to DTO instances
  //   exceptionFactory: (errors) => new BadRequestException(errors),
  // }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
