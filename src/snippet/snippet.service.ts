import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippet } from './entities/snippet.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SnippetService {
  constructor(
    @InjectRepository(Snippet) private snippetRepository: Repository<Snippet>,
  ) {}

  create(body: CreateSnippetDto, user: User) {
    const snippetDto: CreateSnippetDto = {
      name: body.name,
      content: body.content,
      user,
    };
    return this.snippetRepository.save(snippetDto);
  }

  findAll(user: User) {
    return this.snippetRepository.find({ where: { user } });
  }

  findOne(id: number, user: User) {
    return this.snippetRepository.findOne(id, { where: { user } });
  }

  update(id: number, user: User, updateSnippetDto: UpdateSnippetDto) {
    this.snippetRepository.update({ id, user }, updateSnippetDto);
  }

  remove(id: number, user: User) {
    this.snippetRepository.delete({ id, user });
  }
}
