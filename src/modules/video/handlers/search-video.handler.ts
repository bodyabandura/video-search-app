import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchVideoQuery } from '../queries/search-video.query';
import { VideoService } from '../video.service';

@QueryHandler(SearchVideoQuery)
export class SearchVideoHandler implements IQueryHandler<SearchVideoQuery> {
  constructor(private readonly videoService: VideoService) {}

  async execute(query: SearchVideoQuery) {
    return this.videoService.searchVideos(
      query.q,
      query.pageToken,
      query.maxResults,
    );
  }
}
