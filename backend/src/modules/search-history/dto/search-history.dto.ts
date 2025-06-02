import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SearchHistoryDto {
  @Field()
  query: string;

  @Field()
  timestamp: Date;
}

@ObjectType()
export class SearchAnalyticsDto {
  @Field()
  query: string;

  @Field()
  count: number;
}
