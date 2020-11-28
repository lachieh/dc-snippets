import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(req): string {
    if (req.user) {
      return req.user.tokens.then((tokens) => {
        return `
          <form action="/token" method="POST">
            <input type="hidden" name="name" value="test name" />
            <button type="submit">Get New Token</button>
          </form>
          ${tokens
            .map((token) =>
              token.deletedAt
                ? ''
                : `<form action="/token/${token.id}/delete" method="POST"><button type="submit">Delete ${token.id}</button></form>`,
            )
            .join('')}
        `;
      });
    }
    return `<form action="/auth/github/login" method="POST"><button type="submit">Login</button></form>`;
  }
}
