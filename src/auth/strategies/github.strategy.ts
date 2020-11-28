import { Profile, Strategy } from 'passport-github2';
import { AbstractStrategy, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';

@Injectable()
export class GithubStrategy
  extends PassportStrategy(Strategy, 'github')
  implements AbstractStrategy {
  constructor(
    protected configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL:
        configService.get<string>('APP_URL') + '/auth/github/callback',
    });
  }

  public async validate(accessToken, refreshToken, profile: Profile) {
    const userDto: CreateUserDto = {
      uid: profile.id,
      displayName: profile.displayName,
      provider: profile.provider,
      profile,
    };
    const user = await this.userService.findOrCreate(userDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
