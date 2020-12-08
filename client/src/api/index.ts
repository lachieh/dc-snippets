import { Profile } from 'passport-github2';

class ApiService {
  url = process.env.REACT_APP_API_URL || '';

  public getLoginUrl(): string {
    return this.url + '/auth/github/login';
  }

  public getLogoutUrl(): string {
    return this.url + '/auth/github/logout';
  }

  public getCurrentUser(): Promise<User | null> {
    return this.sendRequest('/api/v1/user/current')
      .then((res) => (res.status > 400 ? null : res.json()))
      .then((data) => {
        return (data as User) || null;
      });
  }

  public getProjects(): Promise<Token[]> {
    return this.sendRequest('/api/v1/token')
      .then((res) => (res.status > 400 ? [] : res.json()))
      .then((data) => {
        return (data as Token[]) || [];
      });
  }

  public createProject(name?: string): Promise<Token> {
    return this.sendRequest('/api/v1/token', 'POST', { name })
      .then((res) => (res.status > 400 ? null : res.json()))
      .then((data) => {
        return (data as Token) || null;
      });
  }

  private sendRequest(
    url: string,
    method: Method = 'GET',
    body?: Record<string, unknown>,
  ): Promise<Response> {
    return fetch(this.url + url, {
      credentials: 'include',
      method,
      body: JSON.stringify(body) || null,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

type Method = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

const apiService = new ApiService();

export default function useApi() {
  return apiService;
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

export interface Token {
  id: number;
  name?: string;
  token: string;
  user: User;
  createdAt: Date;
  deletedAt?: Date;
}
