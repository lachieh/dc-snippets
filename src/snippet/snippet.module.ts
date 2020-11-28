import { Module } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { SnippetController } from './snippet.controller';
import { TokenModule } from '../token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from './entities/snippet.entity';

@Module({
  controllers: [SnippetController],
  providers: [SnippetService],
  imports: [TokenModule, TypeOrmModule.forFeature([Snippet])],
})
export class SnippetModule {}
