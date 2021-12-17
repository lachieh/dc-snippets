import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippet } from './entities/snippet.entity';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class SnippetService {
  constructor(
    @InjectRepository(Snippet) private snippetRepository: Repository<Snippet>,
  ) {}

  async create(
    project: Project,
    createSnippetDto: CreateSnippetDto,
    eager = false,
  ): Promise<Snippet> {
    const snippet: Snippet = await this.snippetRepository.save({
      project,
      ...createSnippetDto,
    });
    if (!eager) {
      delete snippet.project;
    }
    return snippet;
  }

  findAll(project: Project): Promise<Snippet[]> {
    return this.snippetRepository.find({ where: { project } });
  }

  findOne(id: number, project: Project): Promise<Snippet> {
    return this.snippetRepository.findOne(id, { where: { project } });
  }

  update(
    id: number,
    project: Project,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<UpdateResult> {
    return this.snippetRepository.update({ id, project }, updateSnippetDto);
  }

  remove(id: number, project: Project): Promise<DeleteResult> {
    return this.snippetRepository.delete({ id, project });
  }
}
