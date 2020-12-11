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
import { ProjectService } from './project.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('api/v1/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  create(@Req() req, @Body() body) {
    return this.projectService.create(req.user, body.name);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  findAll(@Req() req) {
    return this.projectService.findAllByUser(req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
