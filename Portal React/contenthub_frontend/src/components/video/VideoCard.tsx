import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface VideoCardProps {
  video: {
    id: number;
    videoUrl: string;
    thumbnail?: string;
  };
  isActive: boolean;
  observerRef?: (node: HTMLDivElement | null) => void;
}

const VideoCard = ({ video, isActive, observerRef }: VideoCardProps) => {
  // Состояния видео
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Референсы
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Функция загрузки видео
  const loadVideo = () => {
    if (!videoRef.current || isLoaded || isLoading) return;
    
    console.log(`Loading video ${video.id}: ${video.videoUrl}`);
    setIsLoading(true);
    setError(null);
    
    // Устанавливаем src напрямую и предзагружаем
    videoRef.current.src = video.videoUrl;
    videoRef.current.preload = "auto";
    
    // Запускаем загрузку явно
    videoRef.current.load();
  };

  // Эффект для установки обработчиков событий при монтировании
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    // Обработчики событий
    const handleLoadedData = () => {
      console.log(`Video ${video.id} loaded successfully`);
      setIsLoaded(true);
      setIsLoading(false);
      
      // Автоматически начинаем воспроизведение если видео активно
      if (isActive) {
        tryPlayVideo();
      }
    };
    
    const handleError = (e: Event) => {
      console.error(`Error loading video ${video.id}:`, e);
      setIsLoading(false);
      setError('Failed to load video');
    };
    
    const handleProgress = () => {
      if (videoElement.duration > 0) {
        const progressValue = (videoElement.currentTime / videoElement.duration) * 100;
        setProgress(progressValue);
      }
    };
    
    // Добавляем обработчики
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('timeupdate', handleProgress);
    
    // Устанавливаем свойства
    videoElement.muted = true;
    
    // Очистка при размонтировании
    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('timeupdate', handleProgress);
      
      // Важно: останавливаем воспроизведение и очищаем src
      videoElement.pause();
      
      // Освобождаем ресурсы при размонтировании компонента
      if (!isActive) {
        videoElement.src = '';
      }
    };
  }, [video.id, isActive]);

  // Начинаем загрузку, когда видео становится активным
  useEffect(() => {
    if (isActive && !isLoaded && !isLoading) {
      loadVideo();
    } else if (!isActive && isPlaying) {
      // Останавливаем воспроизведение, если видео не активно
      pauseVideo();
    }
  }, [isActive, isLoaded, isLoading]);

  // Функция для запуска видео с обработкой ошибок
  const tryPlayVideo = () => {
    const videoElement = videoRef.current;
    if (!videoElement || !isLoaded) return;
    
    // Создаем надежный обработчик для воспроизведения
      const playPromise = videoElement.play();
      
      if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.error('Playback error:', err);
          
          // Пытаемся включить звук и повторить воспроизведение
          videoElement.muted = true;
          
          // Повторная попытка воспроизведения
          videoElement.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(secondErr => {
              console.error('Second playback attempt failed:', secondErr);
          setIsPlaying(false);
              setError('Не удалось запустить видео. Попробуйте еще раз.');
            });
        });
      }
  };
  
  // Функция для остановки видео
  const pauseVideo = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
      videoElement.pause();
    setIsPlaying(false);
  };

  // Обработчик клика для переключения воспроизведения
  const handleClick = () => {
    if (isLoaded) {
      // Если видео загружено, переключаем воспроизведение
      if (isPlaying) {
        pauseVideo();
      } else {
        tryPlayVideo();
      }
    } else if (!isLoading) {
      // Если видео не загружено и не загружается, начинаем загрузку
      loadVideo();
    }
  };

  return (
    <div 
      ref={(node) => {
        containerRef.current = node;
        if (observerRef) observerRef(node);
      }}
      className="relative w-full h-screen max-h-[100vh] bg-black flex items-center justify-center snap-start overflow-hidden"
      onClick={handleClick}
      data-video-id={video.id}
      data-is-active={isActive}
      data-is-loaded={isLoaded}
    >
      {/* Видео */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        loop
        playsInline
        muted
        poster={video.thumbnail}
        controls={isPlaying}
      />

      {/* Индикатор прогресса */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 z-10">
        <div 
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Индикатор загрузки */}
      {isLoading && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Ошибка загрузки */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-center">
            <div className="text-red-500 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p>{error}</p>
            <button
              className="mt-2 px-4 py-1 bg-white text-black rounded hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                setError(null);
                loadVideo();
              }}
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Кнопка воспроизведения */}
      {(!isPlaying || !isLoaded) && !isLoading && !error && (
        <button className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-20 h-20 rounded-full bg-black/50 flex items-center justify-center">
            <Play fill="white" className="h-8 w-8 text-white" />
          </div>
        </button>
      )}
    </div>
  );
};

export default VideoCard;
