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
      // Opción adicional para permitir el log de errores de validación
      exceptionFactory: (errors) => {
        logger.error('Validation failed:', errors);
        return errors;
      },
    }),
  );

  await app.listen(3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
