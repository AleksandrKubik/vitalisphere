import React, { useEffect, useRef, useState } from 'react';

interface AudioWaveformProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ 
  isPlaying, 
  currentTime, 
  duration 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bars, setBars] = useState<number[]>([]);
  const animationRef = useRef<number | null>(null);
  
  // Генерация случайной формы волны при монтировании компонента
  useEffect(() => {
    // Генерируем случайный набор высот для баров
    const generateRandomBars = () => {
      const count = 100;
      const randomValues = Array.from({ length: count }, () => 
        Math.random() * 0.8 + 0.2 // От 0.2 до 1
      );
      
      // Сглаживаем значения, чтобы создать более естественную форму волны
      const smoothedBars = [...randomValues];
      for (let i = 1; i < smoothedBars.length - 1; i++) {
        smoothedBars[i] = (randomValues[i - 1] + randomValues[i] * 2 + randomValues[i + 1]) / 4;
      }
      
      return smoothedBars;
    };
    
    // Устанавливаем бары только при монтировании компонента
    setBars(generateRandomBars());
  }, []); // Пустой массив зависимостей - выполняется только при монтировании

  // Отрисовка волны
  useEffect(() => {
    if (!canvasRef.current || bars.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Устанавливаем размеры canvas
    const dpr = window.devicePixelRatio || 1;
    const parentWidth = canvas.parentElement?.clientWidth || window.innerWidth;
    const parentHeight = 120;
    
    // Устанавливаем размеры с учетом плотности пикселей
    canvas.width = parentWidth * dpr;
    canvas.height = parentHeight * dpr;
    canvas.style.width = `${parentWidth}px`;
    canvas.style.height = `${parentHeight}px`;
    
    ctx.scale(dpr, dpr);
    
    // Функция отрисовки
    const draw = (time: number) => {
      // Очищаем canvas перед каждой отрисовкой
      ctx.clearRect(0, 0, parentWidth, parentHeight);
      
      const barWidth = parentWidth / bars.length;
      const baseHeight = parentHeight / 2;
      
      // Определяем, какой процент баров должен быть активным
      const progress = duration > 0 ? currentTime / duration : 0;
      const activeBarCount = Math.floor(bars.length * progress);
      
      // Отрисовываем каждый бар
      bars.forEach((height, index) => {
        // Активные бары рисуем белым, неактивные серым
        const isActive = index < activeBarCount;
        
        // Рассчитываем высоту в зависимости от того, играет ли музыка
        let animatedHeight = height;
        if (isPlaying && isActive) {
          // Добавляем эффект пульсации только для активных баров при воспроизведении
          const pulse = Math.sin(time / 200 + index / 5) * 0.2 + 0.8;
          animatedHeight = height * pulse;
        }
        
        // Рисуем бар
        const barHeight = baseHeight * animatedHeight;
        
        // Создаем закругленные концы для баров
        const radius = barWidth / 2;
        
        ctx.beginPath();
        ctx.moveTo(index * barWidth + radius, baseHeight - barHeight / 2);
        ctx.lineTo(index * barWidth + barWidth - radius, baseHeight - barHeight / 2);
        ctx.arc(index * barWidth + barWidth - radius, baseHeight, radius, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(index * barWidth + radius, baseHeight + barHeight / 2);
        ctx.arc(index * barWidth + radius, baseHeight, radius, Math.PI / 2, -Math.PI / 2);
        ctx.closePath();
        
        // Заливка
        if (isActive) {
          const gradient = ctx.createLinearGradient(0, baseHeight - barHeight / 2, 0, baseHeight + barHeight / 2);
          gradient.addColorStop(0, '#fff');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        }
        
        ctx.fill();
      });
      
      // Продолжаем анимацию, если воспроизведение активно
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };
    
    // Запускаем или останавливаем анимацию в зависимости от состояния воспроизведения
    if (isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(draw);
    } else {
      draw(0); // Отрисовываем статичное состояние
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
    
    // Обработчик изменения размера окна
    const handleResize = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Просто вызываем перерисовку при изменении размера окна
      draw(0);
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Очистка
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bars, isPlaying, currentTime, duration]);
  
  return (
    <div className="w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-32"
      />
    </div>
  );
};

export default AudioWaveform;