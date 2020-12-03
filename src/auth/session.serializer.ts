import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.id);
  }

  async deserializeUser(
    id: number,
    done: (err: Error, payload: User) => void
  ): Promise<any> {
    const user = await this.userService.findOne(id);
    if (!user) done(new Error('No User'), null);
    done(null, user);
  }
}
