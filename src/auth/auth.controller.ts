import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {
  @Post('/github/login')
  @UseGuards(AuthGuard('github'))
  async githubLogin(@Request() req) {
    return req.user;
  }

  @Get('/github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Request() req) {
    return req.user;
  }
}
