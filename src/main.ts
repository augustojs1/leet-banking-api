import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('Leet Banking API')
    .setDescription(
      'Manage your income, expenses and your balance at Leet Banking.',
    )
    .setVersion('1.0')
    .addTag('banking')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('api', app, document);

  // app config
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix('api/v1');

  app.enableCors();
  await app.listen(3333);
  console.log('Server started! 🚀');
}
bootstrap();
