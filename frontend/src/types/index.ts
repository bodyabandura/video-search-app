export interface Video {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export interface VideoDetails extends Video {
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface SearchResult {
  results: Video[];
  totalResults: number;
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface SearchHistoryItem {
  query: string;
  timestamp: string;
}

export interface SearchAnalyticsItem {
  query: string;
  count: number;
} 

export interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelectQuery: (query: string) => void;
}


export interface VideoCardProps {
  video: Video;
  onClick?: () => void;
}


export interface VideoDetailsProps {
  video: VideoDetails;
}