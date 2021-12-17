import { User } from '../../user/entities/user.entity';
import { Project } from '../../project/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Column({ nullable: true })
  @ApiProperty()
  name?: string;

  @Column()
  @ApiProperty()
  content!: string;

  @ManyToOne(() => Project, (project) => project.snippets, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @CreateDateColumn()
  @ApiProperty()
  createdAt!: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt!: Date;
}
