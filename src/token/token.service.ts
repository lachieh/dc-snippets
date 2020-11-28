import { Injectable, Req } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { Token } from './entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, UpdateResult } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    private userService: UserService,
  ) {}

  findAllByUser(user: User): Promise<Token[]> {
    return this.tokenRepository.find({
      where: { user, deletedAt: IsNull() },
    });
  }

  create(user: User, name: string): Promise<Token> {
    const tokenDto: CreateTokenDto = {
      token: this.encrypt(user.uid),
      name,
      user,
    };
    const token = this.tokenRepository.create(tokenDto);
    return this.tokenRepository.save(token);
  }

  findUser(hash: string): Promise<User> {
    const id = this.decrypt(hash);
    return this.userService.findOne(+id);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.tokenRepository.softDelete(id);
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
