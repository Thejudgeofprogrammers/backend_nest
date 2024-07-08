import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('port');
    app.useGlobalPipes(new ValidationPipe()); // Для dto и pipes

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
