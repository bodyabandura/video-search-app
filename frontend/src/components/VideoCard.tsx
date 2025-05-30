import type { VideoCardProps } from '../types';

export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-48 md:h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
          />
        </div>

        <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 line-clamp-2 transition-colors duration-200 group-hover:text-blue-600">
              {video.title}
            </h3>
            <p className="text-gray-600 text-base mb-4 line-clamp-3">
              {video.description}
            </p>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-auto">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">
              {new Date(video.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
