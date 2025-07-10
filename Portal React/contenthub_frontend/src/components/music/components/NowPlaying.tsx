import { Heart, Share2 } from 'lucide-react';
import TrackCover from '../TrackCover';

interface NowPlayingProps {
  track: {
    id: number;
    title: string;
    artist: string;
    audioUrl: string;
  };
  isPlaying: boolean;
  isLiked: boolean;
  onToggleLike: () => void;
  onShare: () => void;
}

const NowPlaying = ({
  track,
  isPlaying,
  isLiked,
  onToggleLike,
  onShare
}: NowPlayingProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
      {/* Обложка трека */}
      <div className="relative w-60 h-60">
        <TrackCover 
          audioUrl={track.audioUrl}
          title={track.title}
          artist={track.artist}
          size="large"
          isActive={isPlaying}
          className="shadow-xl shadow-black/30"
        />
        
        {/* CD-эффект для обложки */}
        <div 
          className={`absolute inset-0 rounded-full bg-gradient-to-br from-gray-900/80 to-transparent z-10 
            transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-80'}`}
        ></div>
        
        {/* Блик на обложке */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent rounded-t-lg"></div>
      </div>
      
      {/* Информация о треке */}
      <div className="flex flex-col items-center md:items-start">
        <h2 className="text-3xl font-bold mb-2 text-center md:text-left">{track.title}</h2>
        <p className="text-xl text-gray-300 mb-6">{track.artist}</p>
        
        <div className="flex space-x-4">
          <button 
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors
              ${isLiked 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                : 'bg-white/10 text-white hover:bg-white/20'}`}
            onClick={onToggleLike}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-400' : ''}`} />
            <span>{isLiked ? 'В избранном' : 'В избранное'}</span>
          </button>
          
          <button 
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={onShare}
          >
            <Share2 className="h-5 w-5" />
            <span>Поделиться</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;