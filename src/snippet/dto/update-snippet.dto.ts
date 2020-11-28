import { PartialType } from '@nestjs/mapped-types';
import { CreateSnippetDto } from './create-snippet.dto';

export class UpdateSnippetDto extends PartialType(CreateSnippetDto) {}
