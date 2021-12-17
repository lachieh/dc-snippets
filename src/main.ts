import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SnippetModule } from './snippet/snippet.module';
import { ValidationPipe } from '@nestjs/common';
import { Snippet } from './snippet/entities/snippet.entity';

async function bootstrap() {
  if (!process.env.APP_URL) {
    throw new Error(
      'Could not find APP_URL. Please set URL of application as an environment variable.',
    );
  }

  const config =
    process.env.NODE_ENV !== 'production'
      ? {
          cors: {
            origin: [process.env.APP_FRONTEND_URL || '*'],
            credentials: true,
          },
        }
      : {};
  const app = await NestFactory.create(AppModule, config);
  app.use(
    session({
      cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        signed: false,
      },
      name: 'nest',
      resave: false,
      secret: process.env.SESSION_SECRET_KEY,
      saveUninitialized: true,
    }),
  );
  app.use(cookieParser());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Snippets API')
    .setVersion('1.0')
    .addTag('snippets')
    .addSecurity('apiKeyHeader', {
      type: 'apiKey',
      in: 'header',
      name: 'x-api-key',
    })
    .addSecurity('apiKeyQuery', {
      type: 'apiKey',
      in: 'query',
      name: 'apiKey',
    })
    .build();
  const swaggerDocOptions = <SwaggerDocumentOptions>{
    include: [SnippetModule],
    extraModels: [Snippet],
  };
  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerDocOptions,
  );
  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('api', app, document, swaggerCustomOptions);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
