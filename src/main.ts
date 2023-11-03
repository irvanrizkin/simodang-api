import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { PrismaErrorHandlerFilter } from './filter/prisma.error.handler.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Simodang API')
    .setDescription('The Simodang API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('articles')
    .addTag('admin/articles')
    .addTag('auth')
    .addTag('devices')
    .addTag('admin/devices')
    .addTag('iot/devices')
    .addTag('admin/log')
    .addTag('admin/masters')
    .addTag('metrics')
    .addTag('admin/metrics')
    .addTag('notifications')
    .addTag('admin/ponds')
    .addTag('ponds')
    .addTag('users')
    .addTag('admin/users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaErrorHandlerFilter(httpAdapter));
  await app.listen(5000);
}
bootstrap();
