import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippet } from './entities/snippet.entity';
import { User } from '../user/entities/user.entity';
import { Token } from '../token/entities/token.entity';

@Injectable()
export class SnippetService {
  constructor(
    @InjectRepository(Snippet) private snippetRepository: Repository<Snippet>,
  ) {}

  create(snippetDto: CreateSnippetDto) {
    return this.snippetRepository.save(snippetDto);
  }

  findAll(token: Token) {
    return this.snippetRepository.find({ where: { token } });
  }

  findOne(id: number, token: Token) {
    return this.snippetRepository.findOne(id, { where: { token } });
  }

  update(id: number, token: Token, updateSnippetDto: UpdateSnippetDto) {
    this.snippetRepository.update({ id, token }, updateSnippetDto);
  }

  remove(id: number, token: Token) {
    this.snippetRepository.delete({ id, token });
  }
}
