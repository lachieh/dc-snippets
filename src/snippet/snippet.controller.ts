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
} from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { TokenGuard } from '../auth/token.guard';

@Controller('api/v1/snippet')
@UseGuards(TokenGuard)
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Post()
  create(@Req() req, @Body() body: CreateSnippetDto) {
    const { name, content } = body;
    const createSnippetDto = {
      name,
      content,
      token: req.locals.token,
      user: req.user,
    };
    return this.snippetService.create(createSnippetDto);
  }

  @Get()
  async findAll(@Req() req, @Res({ passthrough: true }) res) {
    const snippets = await this.snippetService.findAll(req.locals.token);
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
    const snippet = await this.snippetService.findOne(+id, req.locals.token);
    if (!snippet) {
      return res.status(404).json({});
    }
    return snippet;
  }

  @Put(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    return this.snippetService.update(+id, req.locals.token, updateSnippetDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.snippetService.remove(+id, req.locals.token);
  }
}
