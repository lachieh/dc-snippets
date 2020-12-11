import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';

export class CreateSnippetDto {
  name: string;
  content: string;
  project: Project;
  user: User;
}
