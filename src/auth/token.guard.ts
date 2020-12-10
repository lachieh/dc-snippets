import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../token/token.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.query?.apiKey) {
      throw new UnauthorizedException('API Key Required');
    }

    const token = await this.tokenService.validateToken(
      req.query.apiKey as string,
    );

    if (!token) {
      throw new UnauthorizedException('Invalid API Key');
    }
    req.user = token.user;
    req.locals = req.locals ?? {};
    req.locals.token = token;
    return true;
  }
}
