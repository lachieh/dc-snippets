import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateTokenDto {
  @IsNotEmpty()
  user: Promise<User> | User;

  @IsNotEmpty()
  token: string;

  @IsString()
  name: string;
}
