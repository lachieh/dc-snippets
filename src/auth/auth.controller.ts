import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { GithubGuard } from './github-auth.guard';

@Controller('/auth')
export class AuthController {
  @Post('/github/login')
  @UseGuards(GithubGuard)
  async githubLogin(@Request() req) {
    return req.user;
  }

  @Get('/github/callback')
  @UseGuards(GithubGuard)
  async githubLoginCallback(@Res() res) {
    return res.redirect('/');
  }
}
