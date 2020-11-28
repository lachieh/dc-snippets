import { Profile } from 'passport-github2';
import { Token } from '../../token/entities/token.entity';
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

  @OneToMany(() => Token, (token) => token.user, { cascade: true })
  tokens: Promise<Token[]>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
