import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GithubGuard } from './github-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('/auth')
export class AuthController {
  constructor(private config: ConfigService) {}

  @Post('/github/login')
  @UseGuards(GithubGuard)
  async githubLogin(@Req() req) {
    return req.user;
  }

  @Get('/github/callback')
  @UseGuards(GithubGuard)
  async githubLoginCallback(@Res() res) {
    return res.redirect(this.config.get('APP_FRONTEND_URL') || '/');
  }

  @Get('/github/logout')
  async githubLogout(@Req() req, @Res() res) {
    req.logout();
    return res.redirect(this.config.get('APP_FRONTEND_URL') || '/');
  }
}
