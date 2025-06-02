import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';
import { SearchHistoryService } from './search-history.service';
import { SearchHistoryDto, SearchAnalyticsDto } from './dto/search-history.dto';

@ObjectType()
class SearchHistoryResponse {
  @Field(() => [SearchHistoryDto])
  history: SearchHistoryDto[];
}

@ObjectType()
class SearchAnalyticsResponse {
  @Field(() => [SearchAnalyticsDto])
  analytics: SearchAnalyticsDto[];
}

@Resolver()
export class SearchHistoryResolver {
  constructor(private readonly service: SearchHistoryService) {}

  @Query(() => SearchHistoryResponse)
  async searchHistory() {
    const history = await this.service.getHistory();
    return { history };
  }

  @Query(() => SearchAnalyticsResponse)
  async searchAnalytics() {
    const analytics = await this.service.getAnalytics();
    return { analytics };
  }
}
