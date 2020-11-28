import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/auth/github/login')
  @UseGuards(AuthGuard('github'))
  async login(@Request() req) {
    return req.user;
  }

  @Get('/auth/github/callback')
  @UseGuards(AuthGuard('github'))
  async loginCallback(@Request() req) {
    return req.user;
  }
}
