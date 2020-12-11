import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('api/v1/snippet')
@UseGuards(ApiKeyGuard)
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Post()
  create(@Req() req, @Body() body: CreateSnippetDto) {
    const { name, content } = body;
    const createSnippetDto = {
      name,
      content,
      project: req.locals.project,
      user: req.user,
    };
    return this.snippetService.create(createSnippetDto);
  }

  @Get()
  async findAll(@Req() req, @Res({ passthrough: true }) res) {
    const snippets = await this.snippetService.findAll(req.locals.project);
    if (snippets.length === 0) {
      return res.json([]);
    }
    return snippets;
  }

  @Get(':id')
  async findOne(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Param('id') id: string,
  ) {
    const snippet = await this.snippetService.findOne(+id, req.locals.project);
    if (!snippet) {
      res.status(404);
      return;
    }
    return snippet;
  }

  @Put(':id')
  async update(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Param('id') id: string,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    const project = req.locals.project;
    const updated = await this.snippetService.update(
      +id,
      project,
      updateSnippetDto,
    );
    if (!updated.affected) {
      res.status(404);
      return;
    }
    return this.snippetService.findOne(+id, project);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Param('id') id: string,
  ) {
    const deleted = await this.snippetService.remove(+id, req.locals.project);
    if (!deleted.affected) {
      res.status(404);
      return;
    }
    return;
  }
}
