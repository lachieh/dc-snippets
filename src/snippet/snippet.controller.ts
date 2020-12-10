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
  create(@Req() req, @Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetService.create(createSnippetDto, req.locals.token);
  }

  @Get()
  findAll(@Req() req) {
    return this.snippetService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Req() req, @Res() res, @Param('id') id: string) {
    const snippet = await this.snippetService.findOne(+id, req.user.id);
    if (!snippet) {
      return res.status(404).json();
    }
    return snippet;
  }

  @Put(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    return this.snippetService.update(+id, req.user.id, updateSnippetDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.snippetService.remove(+id, req.user.id);
  }
}
