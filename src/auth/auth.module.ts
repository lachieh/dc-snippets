import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './github.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [PassportModule, ConfigModule, UserModule],
  providers: [GithubStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
