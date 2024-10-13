import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { PrismaErrorHandlerFilter } from './filter/prisma.error.handler.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';

const SWAGGER_ENVS = ['dev'];

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

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  if (SWAGGER_ENVS.includes(configService.get<string>('NODE_ENV'))) {
    app.use(
      ['/api', '/api-json'],
      basicAuth({
        challenge: true,
        users: {
          [configService.get<string>('SWAGGER_USER')]:
            configService.get<string>('SWAGGER_PASSWORD'),
        },
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('Simodang API')
      .setDescription('The Simodang API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaErrorHandlerFilter(httpAdapter));
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
