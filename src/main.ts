import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        logger.error('Validation failed:', errors);
        return errors;
      },
    }),
  );

  // Manejo de errores del cliente
  const server = app.getHttpServer();
  server.on('clientError', (err, socket) => {
    logger.error(`Client error: ${err.message}`);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

  await app.listen(3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();