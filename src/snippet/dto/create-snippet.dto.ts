import { User } from '../../user/entities/user.entity';

export class CreateSnippetDto {
  user: User;
  name: string;
  content: string;
}
