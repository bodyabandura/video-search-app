import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VideoResult {
  @Field()
  videoId: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  thumbnailUrl: string;

  @Field()
  publishedAt: string;
}

@ObjectType()
export class VideoSearchResult {
  @Field(() => [VideoResult])
  results: VideoResult[];

  @Field()
  totalResults: number;

  @Field({ nullable: true })
  nextPageToken?: string;

  @Field({ nullable: true })
  prevPageToken?: string;
}
