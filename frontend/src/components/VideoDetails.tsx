import { format } from 'date-fns';
import type { VideoDetailsProps } from '../types';
import { Eye, ThumbsUp, MessageSquare } from 'lucide-react';

export default function VideoDetails({ video }: VideoDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="aspect-video relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10"></div>
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={video.title}
          className="w-full h-full rounded-t-2xl relative"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {video.title}
        </h1>

        <div className="flex flex-wrap items-center gap-8 text-gray-500 mb-8">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{video.viewCount.toLocaleString()} views</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{video.likeCount.toLocaleString()} likes</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{video.commentCount.toLocaleString()} comments</span>
          </div>
          <div className="ml-auto text-gray-400 font-medium">
            {format(new Date(video.publishedAt), 'MMM d, yyyy')}
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{video.description}</p>
      </div>
    </div>
  );
}
