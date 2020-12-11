import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindConditions,
  IsNull,
  LessThan,
  Repository,
  UpdateResult,
} from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { DateTime } from 'luxon';

@Injectable()
export class ProjectService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  findAllByUser(user: User, eager = true): Promise<Project[]> {
    return this.projectRepository.find({
      where: { user, deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
      relations: eager ? ['snippets'] : [],
    });
  }

  async create(user: User, name: string): Promise<Project> {
    const projectDto: CreateProjectDto = {
      project: this.encrypt(user.uid),
      name,
      user,
    };
    const project = this.projectRepository.create(projectDto);
    return this.projectRepository.save(project);
  }

  public remove(id: number): Promise<UpdateResult> {
    return this.projectRepository.softDelete(id);
  }

  public async destroyOld(): Promise<DeleteResult> {
    const now = DateTime.local().minus({ months: 2 }).toJSDate();
    const where: FindConditions<Project> = { createdAt: LessThan<Date>(now) };
    // const found = await this.projectRepository.findAndCount({ where });
    const deleted = await this.projectRepository.delete(where);
    if (!deleted.affected) {
      return;
    }
    return deleted;
  }

  public async validateProject(project: string): Promise<Project> {
    let uid;
    try {
      uid = this.decrypt(project);
    } catch (e) {
      return null;
    }
    const projectEntity = await this.projectRepository.findOne({
      where: { project, deletedAt: IsNull() },
      relations: ['user'],
    });
    if (projectEntity?.user.uid == uid) {
      return projectEntity;
    }
    return null;
  }

  private encrypt(value: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes256',
      this.configService.get('APP_SECRET'),
      iv,
    );
    const ivHex = iv.toString('hex');
    const key = cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
    return ivHex + '.' + key;
  }

  private decrypt(hash: string): string {
    const [iv, content] = hash.split('.');
    const decipher = crypto.createDecipheriv(
      'aes256',
      this.configService.get('APP_SECRET'),
      Buffer.from(iv, 'hex'),
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(content, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}
