import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import VideoCard from '../components/VideoCard';
import { SEARCH_VIDEOS } from '../graphql/queries';
import type { Video } from '../types';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);

  const { data: searchData, loading: searchLoading, error: searchError } = useQuery(SEARCH_VIDEOS, {
    variables: {
      q: searchQuery,
      pageToken,
      maxResults: 12,
    },
    skip: !searchQuery,
    fetchPolicy: 'cache-and-network',
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPageToken(undefined);
  };

  const handleVideoClick = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-500 text-white flex flex-col items-center p-8">
      <header className="mb-12 w-full max-w-7xl text-center">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
          YouTube Video Search
        </h1>
        <p className="text-xl text-gray-200 drop-shadow-md">
          Discover and explore amazing videos
        </p>
      </header>

      <div className="w-full max-w-4xl mb-12">
        <SearchBar
          onSearch={handleSearch}
          isLoading={searchLoading}
        />
      </div>

      <main className="w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {searchLoading && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/20 rounded-3xl shadow-lg">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-white border-solid"></div>
              <p className="mt-8 text-2xl font-semibold">Searching videos...</p>
            </div>
          )}

          {searchError && (
            <div className="col-span-full bg-red-600 bg-opacity-80 rounded-3xl p-10 text-center shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
              <p className="mb-6">Please try again or check your connection.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full font-bold text-black hover:brightness-110 transition"
              >
                Retry Search
              </button>
            </div>
          )}

          {!searchLoading && !searchError && searchData?.searchVideos?.results?.length > 0 && (
            <>
              {searchData.searchVideos.results.map((video: Video) => (
                <VideoCard
                  key={video.videoId}
                  video={video}
                  onClick={() => handleVideoClick(video.videoId)}
                />
              ))}
            </>
          )}

          {searchQuery && !searchLoading && !searchError && searchData?.searchVideos?.results?.length === 0 && (
            <div className="col-span-full bg-white/20 rounded-3xl py-20 text-center shadow-lg">
              <h2 className="text-3xl font-semibold mb-4">No videos found</h2>
              <p>Try a different search term</p>
            </div>
          )}
        </section>

        {!searchLoading && !searchError && searchData?.searchVideos && (
          <div className="flex justify-center gap-6 mt-12">
            <button
              onClick={() => setPageToken(searchData.searchVideos.prevPageToken)}
              disabled={!searchData.searchVideos.prevPageToken}
              className="px-8 py-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 disabled:opacity-50 transition font-semibold"
            >
              ← Previous
            </button>
            <button
              onClick={() => setPageToken(searchData.searchVideos.nextPageToken)}
              disabled={!searchData.searchVideos.nextPageToken}
              className="px-8 py-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 disabled:opacity-50 transition font-semibold"
            >
              Next →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
