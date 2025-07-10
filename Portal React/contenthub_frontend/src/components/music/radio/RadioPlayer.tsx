import React, { useState, useRef, useEffect } from 'react';
import { 
  SkipBack, 
  SkipForward, 
  Pause, 
  Play, 
  Volume2, 
  VolumeX,
  Download
} from 'lucide-react';

// Импортируем компоненты
import AudioWaveform from './AudioWaveform';
import TrackInfo from './TrackInfo';

interface Track {
  id: number;
  title: string;
  audioUrl: string;
  coverColor?: string;
}

interface RadioPlayerProps {
  tracks: Track[];
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ tracks }) => {
  // Состояния компонента
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isChangingTrack, setIsChangingTrack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Один аудио элемент для всего плеера
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Текущий трек
  const currentTrack = tracks[currentTrackIndex];
  
  // Функция загрузки трека - аналогично с VideoCard
  const loadTrack = (trackIndex: number) => {
    if (!audioRef.current || trackIndex >= tracks.length) return;
    
    const track = tracks[trackIndex];
    console.log(`Loading track ${track.id}: ${track.title}`);
    
    // Устанавливаем состояния загрузки
    setIsLoading(true);
    setIsChangingTrack(true);
    setError(null);
    
    try {
      // Останавливаем текущее воспроизведение
      audioRef.current.pause();
      
      // Устанавливаем src напрямую
      audioRef.current.src = track.audioUrl;
      
      // Запускаем загрузку
      audioRef.current.load();
      
      console.log(`Started loading track: ${track.title}`);
    } catch (err) {
      console.error("Error setting track:", err);
      setError("Failed to load track");
      setIsLoading(false);
      setIsChangingTrack(false);
    }
  };
  
  // Инициализация аудио элемента при монтировании
  useEffect(() => {
    // Создаем аудио элемент, если его еще нет
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    const audio = audioRef.current;
    
    // Устанавливаем начальные свойства
    audio.volume = volume / 100;
    audio.muted = isMuted;
    
    // Функции-обработчики событий
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleDurationChange = () => {
      setDuration(audio.duration || 0);
    };
    
    const handleLoadedMetadata = () => {
      console.log(`Metadata loaded for track: ${currentTrack?.title}`);
      setDuration(audio.duration || 0);
    };
    
    const handleLoadedData = () => {
      console.log(`Data loaded for track: ${currentTrack?.title}`);
    };
    
    const handleCanPlayThrough = () => {
      console.log(`Can play through track: ${currentTrack?.title}`);
      // Трек загружен и готов к воспроизведению
      setIsLoading(false);
      setIsChangingTrack(false);
      
      // Если должны воспроизводить, начинаем
      if (isPlaying) {
        audio.play().catch(err => {
          console.error("Error playing track:", err);
          setIsPlaying(false);
        });
      }
    };
    
    const handleEnded = () => {
      console.log("Track ended, going to next");
      // Когда трек закончился, переходим к следующему
      handleNextTrack();
    };
    
    const handleError = (e: ErrorEvent) => {
      console.error("Audio error:", e);
      setError("Playback error");
      setIsLoading(false);
      setIsChangingTrack(false);
    };
    
    // Добавляем обработчики событий
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError as EventListener);
    
    // Загружаем первый трек
    if (tracks.length > 0) {
      loadTrack(0);
    }
    
    // Очистка при размонтировании
    return () => {
      // Останавливаем воспроизведение
      audio.pause();
      
      // Удаляем обработчики событий
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError as EventListener);
      
      // Освобождаем ресурсы
      audio.src = '';
    };
  }, []);
  
  // Эффект для изменения трека при изменении индекса
  useEffect(() => {
    if (tracks.length > 0) {
      loadTrack(currentTrackIndex);
    }
  }, [currentTrackIndex, tracks]);
  
  // Эффект для изменения громкости и отключения звука
  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.volume = volume / 100;
    audioRef.current.muted = isMuted;
  }, [volume, isMuted]);
  
  // Эффект для управления воспроизведением
  useEffect(() => {
    if (!audioRef.current || isLoading) return;
    
    if (isPlaying) {
      // Используем Promise для обработки ошибок
      audioRef.current.play().catch(err => {
        console.error("Error playing track:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isLoading]);
  
  // Переключение на предыдущий трек
  const handlePrevTrack = () => {
    if (isLoading) return; // Предотвращаем быстрое нажатие
    
    setCurrentTrackIndex(prev => {
      if (prev === 0) {
        return tracks.length - 1; // Переходим к последнему треку
      }
      return prev - 1;
    });
  };
  
  // Переключение на следующий трек
  const handleNextTrack = () => {
    if (isLoading) return; // Предотвращаем быстрое нажатие
    
    setCurrentTrackIndex(prev => {
      if (prev === tracks.length - 1) {
        return 0; // Переходим к первому треку
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
  
  // Форматирование времени для отображения
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Текущий трек может быть не определен, если tracks пустой
  const trackTitle = currentTrack ? currentTrack.title : "Loading...";
  const trackColor = currentTrack ? currentTrack.coverColor : undefined;
  
  return (
    <div className="radio-player-container">
      {/* Main player interface */}
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {/* Track visualization */}
          <div className="mb-8 w-full max-w-3xl relative">
            <AudioWaveform 
              isPlaying={isPlaying && !isLoading} 
              currentTime={currentTime} 
              duration={duration} 
            />
            
            {/* Кнопка загрузки трека */}
            {currentTrack && (
              <a 
                href={currentTrack.audioUrl} 
                download
                className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-20"
                aria-label="Загрузить трек"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-5 w-5" />
              </a>
            )}
          </div>
          
          {/* Track information */}
          <TrackInfo 
            title={trackTitle}
            isChanging={isChangingTrack || isLoading}
            coverColor={trackColor}
          />
          
          {/* Error message */}
          {error && (
            <div className="bg-red-900/50 text-white px-4 py-2 rounded-lg mt-4 mb-8">
              <p>{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  loadTrack(currentTrackIndex);
                }}
                className="mt-2 px-4 py-1 bg-red-700 hover:bg-red-600 rounded-md text-sm"
              >
                Try again
              </button>
            </div>
          )}
          
          {/* Progress bar */}
          <div className="w-full max-w-lg mt-10 px-4">
            <div className="w-full h-1 bg-gray-700 rounded-full">
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Player controls */}
          <div className="flex items-center justify-center space-x-8 mt-8">
            <button 
              className="text-white/80 hover:text-white transition-colors"
              onClick={handlePrevTrack}
              aria-label="Previous track"
              disabled={isLoading}
            >
              <SkipBack className={`h-8 w-8 ${isLoading ? 'opacity-50' : ''}`} />
            </button>
            
            <button 
              className={`bg-white rounded-full p-4 text-black hover:bg-gray-200 transition-colors ${isLoading ? 'opacity-70' : ''}`}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </button>
            
            <button 
              className="text-white/80 hover:text-white transition-colors"
              onClick={handleNextTrack}
              aria-label="Next track"
              disabled={isLoading}
            >
              <SkipForward className={`h-8 w-8 ${isLoading ? 'opacity-50' : ''}`} />
            </button>
          </div>
          
          {/* Volume control */}
          <div className="flex items-center mt-8">
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </button>
            
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 mx-3 appearance-none bg-gray-700 rounded-full outline-none"
              style={{
                background: `linear-gradient(to right, white ${volume}%, #374151 ${volume}%)`
              }}
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;
