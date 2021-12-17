import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const NotFoundExceptionSchema: SchemaObject = {
  type: 'object',
  properties: {
    message: { type: 'string', example: 'Not Found' },
    statusCode: { type: 'number', example: 404 },
  },
};
