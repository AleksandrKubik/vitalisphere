import { Music } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TrackCoverProps {
  audioUrl: string;
  title: string;
  artist?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  color?: string;
  isActive?: boolean;
}

const TrackCover = ({ 
  audioUrl, 
  title, 
  artist, 
  size = 'large', 
  className = '', 
  color,
  isActive = false
}: TrackCoverProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Эффект анимации для активного трека
  useEffect(() => {
    if (isActive) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isActive]);
  
  // Генерируем красивый градиент на основе названия трека
  const generateGradient = () => {
    if (color) return `linear-gradient(135deg, ${color}, ${color}80)`;
    
    // Улучшенный алгоритм для генерации гармоничных цветов на основе строки
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue1 = hash % 360;
    const hue2 = (hue1 + 60) % 360; // Более широкий разброс для контраста
    
    return `linear-gradient(135deg, 
      hsl(${hue1}, 85%, 60%), 
      hsl(${hue2}, 85%, 40%)
    )`;
  };
  
  // Определяем классы размера
  const sizeClasses = {
    'small': 'w-12 h-12',
    'medium': 'w-24 h-24',
    'large': 'w-full aspect-square max-w-md'
  }[size];

  // Создаем эквалайзер для активного трека
  const renderEqualizer = () => {
    if (!isActive || size === 'small') return null;
    
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="flex items-end justify-center space-x-1 h-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className={`w-1 bg-white rounded-t-sm ${isAnimating ? 'animate-equalizer' : 'h-1'}`}
              style={{ 
                animationDelay: `${i * 0.1}s`,
                height: isAnimating ? undefined : '4px'
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`${sizeClasses} rounded-lg flex items-center justify-center ${className} overflow-hidden shadow-md relative group`}
      style={{ background: generateGradient() }}
    >
      <div className="flex flex-col items-center justify-center text-white p-4 z-10 relative">
        <Music className={size === 'small' ? 'h-5 w-5' : size === 'medium' ? 'h-8 w-8' : 'h-16 w-16 mb-4'} />
        {size === 'large' && (
          <div className="text-center">
            <p className="font-bold truncate max-w-full text-lg">{title}</p>
            {artist && <p className="text-white/80 text-sm mt-1">{artist}</p>}
          </div>
        )}
      </div>
      
      {/* Ripple эффект для активного трека */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="absolute w-full h-full rounded-full animate-ripple opacity-20 bg-white"></div>
        </div>
      )}
      
      {/* Эквалайзер */}
      {renderEqualizer()}
      
      {/* Overlay при наведении */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default TrackCover;