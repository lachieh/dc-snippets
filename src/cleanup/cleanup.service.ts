import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProjectService } from '../project/project.service';

@Injectable()
export class CleanupService {
  private readonly logger = new Logger(CleanupService.name);
  constructor(private projectService: ProjectService) {
    // run once on launch
    this.handleCron();
  }

  @Cron('* 0 0 * * *') // Once daily
  async handleCron() {
    this.logger.debug('Running Cleanup');
    const result = await this.projectService.destroyOld();
    if (result?.affected) {
      const s = result.affected === 1 ? 's' : '';
      this.logger.log(`Found and removed ${result.affected} old project${s}`);
    } else {
      this.logger.debug('No old projects found');
    }
  }
}
