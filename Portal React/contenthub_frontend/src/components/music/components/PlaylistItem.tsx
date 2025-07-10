import { Heart, Play, MoreHorizontal, Pause } from 'lucide-react';
import TrackCover from '../TrackCover';

interface PlaylistItemProps {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
  isActive: boolean;
  isPlaying: boolean;
  isLiked: boolean;
  onPlay: () => void;
  onToggleLike: () => void;
  onOpenMenu?: () => void;
}

const PlaylistItem = ({
  id,
  title,
  artist,
  audioUrl,
  isActive,
  isPlaying,
  isLiked,
  onPlay,
  onToggleLike,
  onOpenMenu
}: PlaylistItemProps) => {
  return (
    <div 
      className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-white/10 backdrop-blur-md' 
          : 'hover:bg-white/5 cursor-pointer'
      }`}
    >
      {/* Кнопка воспроизведения/паузы с анимированным переходом */}
      <div 
        className="mr-3 relative group"
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
      >
        <div className="relative">
          <TrackCover 
            audioUrl={audioUrl}
            title={title} 
            artist={artist}
            size="small"
            isActive={isActive && isPlaying}
          />
          
          <div className={`absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg opacity-0 
            ${isActive ? 'group-hover:opacity-100' : 'group-hover:opacity-80'} transition-opacity`}>
            {isActive && isPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white" fill="white" />
            )}
          </div>
        </div>
      </div>
      
      {/* Информация о треке */}
      <div 
        className="flex-1 min-w-0 cursor-pointer"
        onClick={onPlay}
      >
        <div className="flex items-baseline">
          <h3 className={`font-medium truncate mr-2 ${isActive ? 'text-blue-400' : 'text-white'}`}>
            {title}
          </h3>
        </div>
        <p className="text-sm text-gray-400 truncate">{artist}</p>
      </div>
      
      {/* Действия с треком */}
      <div className="flex items-center space-x-1">
        <button 
          className={`p-2 rounded-full transition-colors ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          aria-label={isLiked ? "Удалить из избранного" : "Добавить в избранное"}
        >
          <Heart className={`h-5 w-5 transition-transform hover:scale-110 ${isLiked ? 'fill-red-500' : ''}`} />
        </button>
        
        <button 
          className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onOpenMenu?.();
          }}
          aria-label="Дополнительные действия"
        >
          <MoreHorizontal className="h-5 w-5 transition-transform hover:scale-110" />
        </button>
      </div>
    </div>
  );
};

export default PlaylistItem;