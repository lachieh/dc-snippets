import { Profile } from 'passport-github2';
import { Project } from '../../project/entities/project.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uid!: string;

  @Column()
  provider!: string;

  @Column()
  displayName!: string;

  @Column('jsonb')
  profile!: Profile;

  @OneToMany(() => Project, (project) => project.user)
  projects: Promise<Project[]>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
