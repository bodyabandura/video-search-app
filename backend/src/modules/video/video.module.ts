import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SearchVideoHandler } from './handlers/search-video.handler';
import { VideoService } from './video.service';
import { VideoResolver } from './video.resolver';
import { SearchHistoryModule } from '../search-history/search-history.module';
import { GetVideoDetailsHandler } from './handlers/get-video-details.handler';

@Module({
  imports: [CqrsModule, SearchHistoryModule],
  providers: [
    VideoService,
    VideoResolver,
    SearchVideoHandler,
    GetVideoDetailsHandler,
  ],
})
export class VideoModule {}
