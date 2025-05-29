import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SearchHistory } from './entities/search-history.entity';
import { SearchHistoryService } from './search-history.service';
import { SearchHistoryResolver } from './search-history.resolver';

@Module({
  imports: [MikroOrmModule.forFeature([SearchHistory])],
  providers: [SearchHistoryService, SearchHistoryResolver],
  exports: [SearchHistoryService],
})
export class SearchHistoryModule {}
