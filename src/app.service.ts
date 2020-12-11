import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(req): string {
    if (req.user) {
      return req.user.projects.then((projects) => {
        return `
          <form action="/project" method="POST">
            <input type="hidden" name="name" value="test name" />
            <button type="submit">Get New Project</button>
          </form>
          ${projects
            .map((project) =>
              project.deletedAt
                ? ''
                : `<form action="/project/${project.id}/delete" method="POST"><button type="submit">Delete ${project.id}</button></form>`,
            )
            .join('')}
        `;
      });
    }
    return `<form action="/auth/github/login" method="POST"><button type="submit">Login</button></form>`;
  }
}
