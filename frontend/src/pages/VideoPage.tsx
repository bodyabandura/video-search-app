import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_VIDEO_DETAILS } from '../graphql/queries';
import type { VideoDetails } from '../types';

export default function VideoPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_VIDEO_DETAILS, {
    variables: { videoId },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                <p className="mt-8 text-lg text-gray-600 font-medium">Loading video details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-xl opacity-20"></div>
              <div className="relative text-red-500 mb-6">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-2xl text-gray-800 mb-4 font-semibold">Error loading video</p>
              <p className="text-gray-600 mb-8">Please try again later</p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Back to Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const video: VideoDetails = data.videoDetails;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="aspect-video relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10"></div>
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {video.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-gray-500 mb-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="font-medium">{video.viewCount.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-medium">{video.likeCount.toLocaleString()} likes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium">{video.commentCount.toLocaleString()} comments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{new Date(video.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                {video.description}
              </p>
              <div className="flex justify-between items-center flex-wrap gap-4">
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  Watch on YouTube
                </a>
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-4 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Back to Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
