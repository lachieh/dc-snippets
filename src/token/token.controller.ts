import {
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
  Get,
  Body,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  create(@Req() req, @Body() body) {
    return this.tokenService.create(req.user, body.name);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  findAll(@Req() req) {
    return this.tokenService.findAllByUser(req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  remove(@Param('id') id: string) {
    return this.tokenService.remove(+id);
  }
}
