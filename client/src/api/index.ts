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

  public getProjects(): Promise<Project[]> {
    return this.sendRequest('/api/v1/project')
      .then((res) => (res.status > 400 ? [] : res.json()))
      .then((data) => {
        return (data as Project[]) || [];
      });
  }

  public createProject(name?: string): Promise<Project> {
    return this.sendRequest('/api/v1/project', 'POST', { name })
      .then((res) => (res.status > 400 ? null : res.json()))
      .then((data) => {
        return (data as Project) || null;
      });
  }

  public destroyProject(id: number): Promise<boolean> {
    return this.sendRequest(`/api/v1/project/${id}`, 'DELETE')
      .then((res) => (res.status > 400 ? false : res.json()))
      .then((data) => {
        return data ? true : false;
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

export default function useApi(): ApiService {
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

export interface Project {
  id: number;
  name?: string;
  project: string;
  user: User;
  snippets: Snippet[];
  createdAt: Date;
  deletedAt?: Date;
}

export interface Snippet {
  id: number;
  name?: string;
  content: string;
  user: number;
  project: number;
  createdAt: Date;
  updatedAt: Date;
}
