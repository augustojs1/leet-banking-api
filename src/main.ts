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
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app config
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: 'http://localhost:3000',
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS,PATCH',
    credentials: true,
  });
  await app.listen(3333);
  console.log('Server started! 🚀');
}
bootstrap();
