import { Module } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [ProjectModule],
  providers: [CleanupService],
})
export class CleanupModule {}
