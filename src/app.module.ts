import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TokenModule } from './token/token.module';
import { Token } from './token/entities/token.entity';
import { SnippetModule } from './snippet/snippet.module';
import { Snippet } from './snippet/entities/snippet.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'dc-snippets',
      synchronize: true,
      logging: false,
      entities: [User, Token, Snippet],
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    TokenModule,
    SnippetModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../.', 'client/build'),
      exclude: ['/api/*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
