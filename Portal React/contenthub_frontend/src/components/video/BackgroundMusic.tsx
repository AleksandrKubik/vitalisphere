import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface BackgroundMusicProps {
  audioUrl: string;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ audioUrl }) => {
  const [isMuted, setIsMuted] = useState(true); // По умолчанию звук выключен
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Инициализация аудио
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Устанавливаем громкость на 30%
      audioRef.current.loop = true; // Зацикливаем воспроизведение
      audioRef.current.muted = isMuted; // Устанавливаем начальное состояние звука
      
      // Пытаемся воспроизвести аудио только после взаимодействия пользователя
      if (!isMuted) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback error:', error);
            setIsMuted(true); // Если воспроизведение не удалось, устанавливаем звук на выключенный
          });
        }
      }
    }
  }, [isMuted, audioUrl]);
  
  // Обработчик переключения звука
  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.muted = newMutedState;
      
      // Если включаем звук, начинаем воспроизведение
      if (!newMutedState && audioRef.current.paused) {
        audioRef.current.play()
          .catch(error => {
            console.error('Playback error:', error);
            setIsMuted(true);
          });
      }
    }
  };
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Скрытый аудио-элемент */}
      <audio ref={audioRef} src={audioUrl} preload="auto" />
      
      {/* Кнопка включения/выключения звука */}
      <button 
        className="flex items-center px-4 py-2 bg-black/40 hover:bg-black/60 rounded-lg text-white transition-all duration-300 backdrop-blur-sm"
        onClick={toggleMute}
        aria-label={isMuted ? "Enable background music" : "Disable background music"}
      >
        {isMuted ? 
          <VolumeX className="h-5 w-5" /> : 
          <Volume2 className="h-5 w-5" />
        }
        <span className="ml-2 text-xs">Background Music</span>
      </button>
    </div>
  );
};

export default BackgroundMusic;
