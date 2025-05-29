import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { VideoSearchResult } from './dto/video-search.result';
import { SearchVideoQuery } from './queries/search-video.query';
import { SearchHistoryService } from '../search-history/search-history.service';
import { VideoDetailsResult } from './dto/video-details.result';
import { GetVideoDetailsQuery } from './queries/get-video-details.query';

@Resolver()
export class VideoResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly searchHistoryService: SearchHistoryService,
  ) {}

  @Query(() => VideoSearchResult)
  async searchVideos(
    @Args('q') q: string,
    @Args('pageToken', { nullable: true }) pageToken?: string,
    @Args('maxResults', { type: () => Number, defaultValue: 10 })
    maxResults?: number,
  ): Promise<VideoSearchResult> {
    await this.searchHistoryService.saveSearch(q);
    return this.queryBus.execute(
      new SearchVideoQuery(q, pageToken, maxResults),
    );
  }

  @Query(() => VideoDetailsResult)
  async videoDetails(
    @Args('videoId') videoId: string,
  ): Promise<VideoDetailsResult> {
    return this.queryBus.execute(new GetVideoDetailsQuery(videoId));
  }
}
