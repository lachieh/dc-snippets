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
  NotFoundException,
} from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Snippet } from './entities/snippet.entity';
import { NotFoundExceptionSchema } from '../schema/not-found.schema';
import { UnauthorizedExceptionSchema } from '../schema/not-authorized.schema';

@Controller('api/v1/snippet')
@UseGuards(ApiKeyGuard)
@ApiTags('snippets')
@ApiSecurity('apiKeyHeader')
@ApiSecurity('apiKeyQuery')
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
  schema: UnauthorizedExceptionSchema,
})
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Post()
  @ApiCreatedResponse({ type: Snippet })
  create(@Req() req, @Body() body: CreateSnippetDto): Promise<Snippet> {
    const createSnippetDto = {
      name: body.content || 'null',
      content: body.content || 'null',
    };
    return this.snippetService.create(req.locals.project, createSnippetDto);
  }

  @Get()
  @ApiOkResponse({ type: Snippet })
  async findAll(
    @Req() req,
    @Res({ passthrough: true }) res,
  ): Promise<Snippet[]> {
    const snippets = await this.snippetService.findAll(req.locals.project);
    if (snippets.length === 0) {
      return res.json([]);
    }
    return snippets;
  }

  @Get(':id')
  @ApiOkResponse({ type: Snippet })
  @ApiNotFoundResponse({ schema: NotFoundExceptionSchema })
  async findOne(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Param('id') id: string,
  ): Promise<Snippet> {
    const snippet = await this.snippetService.findOne(+id, req.locals.project);
    if (!snippet) {
      throw new NotFoundException();
    }
    return snippet;
  }

  @Put(':id')
  @ApiOkResponse({ type: Snippet })
  @ApiNotFoundResponse({ schema: NotFoundExceptionSchema })
  async update(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Param('id') id: string,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ): Promise<Snippet> {
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
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ schema: NotFoundExceptionSchema })
  async remove(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Param('id') id: string,
  ): Promise<void> {
    const deleted = await this.snippetService.remove(+id, req.locals.project);
    if (!deleted.affected) {
      res.status(404);
      return;
    }
    return;
  }
}
