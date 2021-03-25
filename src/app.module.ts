import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';
import { SnippetModule } from './snippet/snippet.module';
import { Snippet } from './snippet/entities/snippet.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { CleanupModule } from './cleanup/cleanup.module';

console.log('serving files from: ', join(__dirname, '../.', 'client/build'))

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const entities = [User, Project, Snippet];
        const dbUrl = configService.get('DATABASE_URL');
        if (dbUrl) {
          return {
            url: configService.get('DATABASE_URL'),
            type: 'postgres',
            synchronize: false,
            entities,
          };
        }
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          database: 'dc-snippets',
          synchronize: true,
          logging: false,
          entities,
        };
      },
    }),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    ProjectModule,
    SnippetModule,
    CleanupModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../.', 'client/build'),
      exclude: ['/api/*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
