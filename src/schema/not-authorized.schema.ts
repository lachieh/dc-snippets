import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const UnauthorizedExceptionSchema: SchemaObject = {
  type: 'object',
  properties: {
    statusCode: { type: 'number', example: 401 },
    error: { type: 'string', example: 'Unauthorized' },
    message: { type: 'string', example: 'API Key Required' },
  },
};
