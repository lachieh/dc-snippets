import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectService } from '../project/project.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private projectService: ProjectService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.query?.apiKey) {
      throw new UnauthorizedException('API Key Required');
    }

    const project = await this.projectService.validateProject(
      req.query.apiKey as string,
    );

    if (!project) {
      throw new UnauthorizedException('Invalid API Key');
    }
    req.user = project.user;
    req.locals = req.locals ?? {};
    req.locals.project = project;
    return true;
  }
}
