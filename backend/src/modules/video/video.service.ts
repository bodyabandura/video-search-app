import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { VideoSearchResult } from './dto/video-search.result';

import { config as dotenvConfig } from 'dotenv';
import { VideoDetailsResult } from './dto/video-details.result';

dotenvConfig({
  path: '.env',
});

@Injectable()
export class VideoService {
  async searchVideos(
    q: string,
    pageToken?: string,
    maxResults = 10,
  ): Promise<VideoSearchResult> {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    });

    const res = await youtube.search.list({
      part: ['snippet'],
      q,
      maxResults,
      pageToken,
      type: ['video'],
    });

    const results =
      res.data.items?.map((item) => ({
        videoId: item.id?.videoId ?? '',
        title: item.snippet?.title ?? '',
        description: item.snippet?.description ?? '',
        thumbnailUrl: item.snippet?.thumbnails?.default?.url ?? '',
        publishedAt: item.snippet?.publishedAt ?? '',
      })) || [];

    return {
      results,
      totalResults: res.data.pageInfo?.totalResults || 0,
      nextPageToken: res.data.nextPageToken ?? undefined,
      prevPageToken: res.data.prevPageToken ?? undefined,
    };
  }

  async getVideoDetails(videoId: string): Promise<VideoDetailsResult> {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    });

    const res = await youtube.videos.list({
      part: ['snippet', 'statistics'],
      id: [videoId],
    });

    const item = res.data.items?.[0];
    if (!item) {
      throw new Error('Video not found');
    }

    return {
      videoId: item.id ?? '',
      title: item.snippet?.title ?? '',
      description: item.snippet?.description ?? '',
      thumbnailUrl: item.snippet?.thumbnails?.default?.url ?? '',
      publishedAt: item.snippet?.publishedAt ?? '',
      viewCount: Number(item.statistics?.viewCount ?? 0),
      likeCount: Number(item.statistics?.likeCount ?? 0),
      commentCount: Number(item.statistics?.commentCount ?? 0),
    };
  }
}
