import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateProjectDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  project: string;

  @IsString()
  name: string;
}
