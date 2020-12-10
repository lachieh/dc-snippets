import { User } from '../../user/entities/user.entity';
import { Token } from '../../token/entities/token.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name?: string;

  @Column()
  content!: string;

  @ManyToOne(() => User, (user) => user.snippets)
  user: User;

  @ManyToOne(() => Token, (token) => token.snippets)
  token: Token;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
