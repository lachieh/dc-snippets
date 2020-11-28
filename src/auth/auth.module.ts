import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './strategies/github.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule, ConfigModule, UserModule],
  providers: [GithubStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
