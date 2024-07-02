import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  const config = new DocumentBuilder()
    .setTitle("Backend API")
    .setDescription("Документация по маршрутам в проекте")
    .setVersion("1.0.0")
    .addTag("API")
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document) // 1. Prefix (path) 2. Экземпляр приложения 3. Экземпляр документа
  await app.listen(port);
};

bootstrap();
