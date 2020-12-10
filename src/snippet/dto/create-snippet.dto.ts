import { Token } from '../../token/entities/token.entity';
import { User } from '../../user/entities/user.entity';

export class CreateSnippetDto {
  name: string;
  content: string;
  token: Token;
  user: User;
}
