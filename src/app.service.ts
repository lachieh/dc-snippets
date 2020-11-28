import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<form action="/auth/github/login" method="POST"><button type="submit">Login</submit></form>';
  }
}
