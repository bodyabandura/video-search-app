import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetVideoDetailsQuery } from '../queries/get-video-details.query';
import { VideoService } from '../video.service';
import { VideoDetailsResult } from '../dto/video-details.result';

@QueryHandler(GetVideoDetailsQuery)
export class GetVideoDetailsHandler
  implements IQueryHandler<GetVideoDetailsQuery>
{
  constructor(private readonly videoService: VideoService) {}

  async execute(query: GetVideoDetailsQuery): Promise<VideoDetailsResult> {
    return this.videoService.getVideoDetails(query.videoId);
  }
}
