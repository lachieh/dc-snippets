import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SnippetModule } from './snippet/snippet.module';

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Snippets API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'apiKey',
      description: 'Get an API key by signing in and creating a new Project',
      name: '',
    })
    .build();
  const swaggerOptions = <SwaggerDocumentOptions>{
    include: [SnippetModule],
  };
  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
