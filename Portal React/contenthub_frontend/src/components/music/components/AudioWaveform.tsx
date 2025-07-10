import { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isPlaying: boolean;
  className?: string;
}

const AudioWaveform = ({ isPlaying, className = '' }: AudioWaveformProps) => {
  // Создаем массив случайных высот для линий (имитация волн)
  const waveSegments = Array.from({ length: 40 }, () => Math.random() * 0.8 + 0.2);
  
  return (
    <div className={`flex items-center justify-center w-full h-16 ${className}`}>
      <div className="flex items-center space-x-0.5 h-full">
        {waveSegments.map((height, index) => (
          <div
            key={index}
            className={`w-1 rounded-full bg-gradient-to-t from-blue-400 to-blue-600 transition-all duration-300
              ${isPlaying ? 'opacity-100' : 'opacity-40'}`}
            style={{
              height: `${isPlaying ? (height * 100) : 15}%`,
              animationDuration: `${0.7 + Math.random() * 0.6}s`,
              animation: isPlaying ? 'waveAnimation 1s infinite alternate ease-in-out' : 'none',
              animationDelay: `${index * 0.05}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioWaveform;
