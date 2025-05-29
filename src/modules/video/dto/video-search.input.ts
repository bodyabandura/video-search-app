import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class VideoSearchInput {
  @Field()
  q: string;

  @Field({ nullable: true })
  pageToken?: string;

  @Field(() => Int, { defaultValue: 10 })
  maxResults?: number;
}
