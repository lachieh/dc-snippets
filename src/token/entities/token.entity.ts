import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {} from 'crypto';
import { User } from '../../user/entities/user.entity';
import { Snippet } from '../../snippet/entities/snippet.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true })
  token!: string;

  @ManyToOne(() => User, (user) => user.tokens, { eager: true })
  user: User;

  @OneToMany(() => Snippet, (snippet) => snippet.token, {
    eager: true,
    cascade: true,
  })
  snippets: Snippet;

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
