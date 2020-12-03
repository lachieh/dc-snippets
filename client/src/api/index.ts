import { Profile } from 'passport-github2';

export default class ApiService {
  url = process.env.REACT_APP_API_URL || '';

  getLoginUrl(): string {
    return this.url + '/auth/github/login';
  }

  getLogoutUrl(): string {
    return this.url + '/auth/github/login';
  }

  getCurrentUser(): Promise<User | null> {
    return fetch(this.url + '/api/v1/user/current')
      .then((res) => (res.status > 400 ? null : res.json()))
      .then((data) => {
        return (data as User) || null;
      });
  }
}

export interface User {
  id: number;
  uid: string;
  provider: string;
  displayName: string;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
}
