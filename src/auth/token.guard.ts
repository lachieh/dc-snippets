import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../token/token.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    if (!req.query?.apiKey) {
      throw new UnauthorizedException('API Key Required');
    }

    const token = await this.tokenService.validateToken(
      req.query.apiKey as string,
    );

    if (!token) {
      throw new UnauthorizedException('Invalid API Key');
    }
    req.user = await token.user;
    return true;
  }
}
