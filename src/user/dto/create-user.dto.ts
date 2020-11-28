import { Profile } from 'passport';

export class CreateUserDto {
  uid: string;
  provider: string;
  displayName: string;
  profile: Profile;
}
