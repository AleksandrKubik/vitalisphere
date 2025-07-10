import React, { useState, useRef, useEffect } from 'react';
import { 
  SkipBack, 
  SkipForward, 
  Pause, 
  Play, 
  Volume2, 
  VolumeX,
  Maximize,
  Minimize,
  Download
} from 'lucide-react';

interface Video {
  id: number;
  title: string;
  videoUrl: string;
  coverColor?: string;
}

interface VideoPlayerProps {
  videos: Video[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videos }) => {
  // Состояния компонента
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isChangingVideo, setIsChangingVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Референсы
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerWrapperRef = useRef<HTMLDivElement | null>(null);
  
  // Текущее видео
  const currentVideo = videos[currentVideoIndex];
  
  // Эффект для инициализации плеера
  useEffect(() => {
    if (videos.length > 0) {
      setIsLoading(true);
      setIsChangingVideo(true);
      setError(null);
    }
  }, [videos]);
  
  // Эффект для изменения видео при изменении индекса
  useEffect(() => {
    if (videos.length > 0) {
      setIsLoading(true);
      setIsChangingVideo(true);
      setError(null);
      
      // Сбрасываем текущее время
      setCurrentTime(0);
      
      // Если видео элемент существует, загружаем новое видео
      if (videoRef.current) {
        videoRef.current.load();
      }
    }
  }, [currentVideoIndex, videos]);
  
  // Эффект для управления воспроизведением
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    if (isPlaying) {
      // Воспроизведение со стратегией обработки ошибок
      const playPromise = videoElement.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error('Playback error:', err);
          setIsPlaying(false);
        });
      }
    } else {
      videoElement.pause();
    }
  }, [isPlaying]);
  
  // Эффект для управления громкостью и отключением звука
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    videoElement.volume = volume / 100;
    videoElement.muted = isMuted;
  }, [volume, isMuted]);
  
  // Переключение на предыдущее видео
  const handlePrevVideo = () => {
    if (isLoading) return; // Предотвращаем быстрое нажатие
    
    setCurrentVideoIndex(prev => {
      if (prev === 0) {
        return videos.length - 1; // Переходим к последнему видео
      }
      return prev - 1;
    });
  };
  
  // Переключение на следующее видео
  const handleNextVideo = () => {
    if (isLoading) return; // Предотвращаем быстрое нажатие
    
    setCurrentVideoIndex(prev => {
      if (prev === videos.length - 1) {
        return 0; // Переходим к первому видео
      }
      return prev + 1;
    });
  };
  
  // Переключение воспроизведения
  const togglePlay = () => {
    if (isLoading) return; // Игнорируем во время загрузки
    
    setIsPlaying(prev => !prev);
  };
  
  // Переключение отключения звука
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };
  
  // Изменение громкости
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    // Если громкость > 0, включаем звук
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
    // Если громкость = 0, выключаем звук
    if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
    }
  };
  
  // Обработчики событий для видео
  const handleLoadedMetadata = () => {
    console.log(`Video ${currentVideo?.title} metadata loaded`);
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  const handleLoadedData = () => {
    console.log(`Video ${currentVideo?.title} data loaded`);
    setIsLoading(false);
    setIsChangingVideo(false);
    
    // Если должны воспроизводить, начинаем
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Error playing video:", err);
        setIsPlaying(false);
      });
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  
  const handleEnded = () => {
    console.log(`Video ${currentVideo?.title} ended`);
    handleNextVideo();
  };
  
  const handleError = () => {
    console.error(`Error playing video ${currentVideo?.title}`);
    setError("Ошибка воспроизведения видео");
    setIsLoading(false);
    setIsChangingVideo(false);
  };
  
  // Форматирование времени для отображения
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Переключение полноэкранного режима
  const toggleFullscreen = () => {
    if (!playerWrapperRef.current) return;
    
    if (!document.fullscreenElement) {
      playerWrapperRef.current.requestFullscreen().catch(err => {
        console.error(`Ошибка при переходе в полноэкранный режим: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  // Обработчик изменения состояния полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Текущее видео может быть не определено, если videos пустой
  const videoTitle = currentVideo ? currentVideo.title : "Загрузка...";
  const videoColor = currentVideo ? currentVideo.coverColor : undefined;
  
  return (
    <div className="video-player-container">
      {/* Main player interface */}
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {/* Video player */}
          <div 
            ref={playerWrapperRef}
            className={`react-player-wrapper w-full max-w-3xl mx-auto mb-4 ${isFullscreen ? 'fullscreen' : ''}`}
          >
            {currentVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  src={currentVideo.videoUrl}
                  preload="auto"
                  playsInline
                  onLoadedMetadata={handleLoadedMetadata}
                  onLoadedData={handleLoadedData}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleEnded}
                  onError={handleError}
                />
                
                {/* Оверлей для клика по видео */}
                <div 
                  className="absolute inset-0 cursor-pointer"
                  onClick={togglePlay}
                />
              </div>
            )}
            
            {/* Индикатор загрузки */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Кнопки управления видео */}
            <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
              {/* Кнопка загрузки видео */}
              <a 
                href={currentVideo?.videoUrl} 
                download
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                aria-label="Загрузить видео"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-5 w-5" />
              </a>
              
              {/* Кнопка полноэкранного режима */}
              <button 
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="bg-red-900/50 text-white px-4 py-2 rounded-lg mt-4 mb-8">
              <p>{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  setIsLoading(true);
                  setIsChangingVideo(true);
                  
                  // Перезагружаем текущее видео
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
                className="mt-2 px-4 py-1 bg-red-700 hover:bg-red-600 rounded-md text-sm"
              >
                Попробовать снова
              </button>
            </div>
          )}
          
          {/* Компактные элементы управления */}
          <div className="compact-controls w-full max-w-lg">
            {/* Progress bar */}
            <div className="progress-bar w-full px-2">
              <div className="w-full h-1 bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-white rounded-full"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            {/* Player controls */}
            <div className="flex items-center justify-center space-x-6 mt-4">
              <button 
                className="text-white/80 hover:text-white transition-colors"
                onClick={handlePrevVideo}
                aria-label="Предыдущее видео"
                disabled={isLoading}
              >
                <SkipBack className={`h-6 w-6 ${isLoading ? 'opacity-50' : ''}`} />
              </button>
              
              <button 
                className={`bg-white rounded-full p-2 text-black hover:bg-gray-200 transition-colors ${isLoading ? 'opacity-70' : ''}`}
                onClick={togglePlay}
                aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-6 w-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
              
              <button 
                className="text-white/80 hover:text-white transition-colors"
                onClick={handleNextVideo}
                aria-label="Следующее видео"
                disabled={isLoading}
              >
                <SkipForward className={`h-6 w-6 ${isLoading ? 'opacity-50' : ''}`} />
              </button>
              
              <div className="flex items-center ml-2">
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Включить звук" : "Выключить звук"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 mx-2 appearance-none bg-gray-700 rounded-full outline-none"
                  style={{
                    background: `linear-gradient(to right, white ${volume}%, #374151 ${volume}%)`
                  }}
                  aria-label="Громкость"
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default VideoPlayer;
