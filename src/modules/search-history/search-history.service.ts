import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { SearchHistory } from './entities/search-history.entity';

type AnalyticsRow = { query: string; count: string | number };

@Injectable()
export class SearchHistoryService {
  constructor(private readonly em: EntityManager) {}

  async saveSearch(query: string): Promise<void> {
    const search = new SearchHistory();
    search.query = query;
    search.timestamp = new Date();
    await this.em.persistAndFlush(search);
  }

  async getHistory(): Promise<SearchHistory[]> {
    return this.em.find(SearchHistory, {}, { orderBy: { timestamp: 'DESC' } });
  }

  async getAnalytics(): Promise<{ query: string; count: number }[]> {
    const result = await this.em.getConnection().execute(
      `SELECT query, COUNT(*) as count
       FROM search_history
       GROUP BY query
       ORDER BY count DESC`,
    );
    return result.map((row: AnalyticsRow) => ({
      query: row.query,
      count: Number(row.count),
    }));
  }
}
