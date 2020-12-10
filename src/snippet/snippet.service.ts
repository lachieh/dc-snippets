import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippet } from './entities/snippet.entity';
import { Token } from '../token/entities/token.entity';

@Injectable()
export class SnippetService {
  constructor(
    @InjectRepository(Snippet) private snippetRepository: Repository<Snippet>,
  ) {}

  async create(snippetDto: CreateSnippetDto, eager = false): Promise<Snippet> {
    const snippet = await this.snippetRepository.save(snippetDto);
    if (!eager) {
      delete snippet.user;
      delete snippet.token;
    }
    return snippet;
  }

  findAll(token: Token): Promise<Snippet[]> {
    return this.snippetRepository.find({ where: { token } });
  }

  findOne(id: number, token: Token): Promise<Snippet> {
    return this.snippetRepository.findOne(id, { where: { token } });
  }

  update(
    id: number,
    token: Token,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<UpdateResult> {
    return this.snippetRepository.update({ id, token }, updateSnippetDto);
  }

  remove(id: number, token: Token): Promise<DeleteResult> {
    return this.snippetRepository.delete({ id, token });
  }
}
