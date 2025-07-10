import { useState, useRef, useEffect, useCallback } from 'react';
import { Home, Menu, X, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../components/video/VideoCard';
import BackgroundMusic from '../components/video/BackgroundMusic';
import VideoShortsList from '../components/video/VideoShortsList';

// Типы для метаданных видео
interface VideoMetadata {
  id: number;
  videoUrl: string;
  thumbnail?: string;
}

// Тип для ответа API
interface ApiResponse {
  success: boolean;
  data: {
    id: number;
    video_url: string;
  }[];
}

const VideoPage = () => {
  // Состояния компонента
  const [videos, setVideos] = useState<VideoMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Референсы для навигации и отслеживания прокрутки
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Получение тестовых видео для быстрой загрузки
  const getTestVideos = useCallback(() => {
    return [
      {
        id: 1,
        videoUrl: '/content/videos/videos_1.mp4',
        thumbnail: '/content/videos/thumb1.jpg'
      },
      {
        id: 2,
        videoUrl: '/content/videos/videos_2.mp4',
        thumbnail: '/content/videos/thumb2.jpg'
      },
      {
        id: 3,
        videoUrl: '/content/videos/videos_3.mp4',
        thumbnail: '/content/videos/thumb3.jpg'
      },
      {
        id: 4,
        videoUrl: '/content/videos/videos_4.mp4',
        thumbnail: '/content/videos/thumb4.jpg'
      },
      {
        id: 5,
        videoUrl: '/content/videos/videos_5.mp4',
        thumbnail: '/content/videos/thumb5.jpg'
      }
    ];
  }, []);
  
  // Загрузка видео при монтировании компонента
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Сначала показываем тестовые видео для быстрой загрузки
        const testVideos = getTestVideos();
        setVideos(testVideos);
        setLoading(false);
        
        // Затем пытаемся загрузить видео из API
        try {
          const response = await axios.get<ApiResponse>('/api/videos');
          
          if (response.data.success && response.data.data.length > 0) {
            // Преобразуем данные API в нужный формат
            const apiVideos = response.data.data.map(video => ({
              id: video.id,
              videoUrl: video.video_url,
              thumbnail: `/content/videos/thumb${video.id % 5 + 1}.jpg` // Циклические миниатюры
            }));
            
            // Обновляем состояние
            setVideos(apiVideos);
          }
        } catch (apiError) {
          console.error('API error:', apiError);
          // Уже показываем тестовые видео, так что ошибку не отображаем
        }
      } catch (err) {
        console.error('Error initializing videos:', err);
        setError('Failed to load videos');
      }
    };
    
    fetchVideos();
  }, [getTestVideos]);
  
  // Настройка IntersectionObserver для отслеживания активного видео
  useEffect(() => {
    // Очищаем предыдущий observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Создаем новый observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const videoId = entry.target.getAttribute('data-video-id');
            const index = videos.findIndex(v => v.id.toString() === videoId);
            if (index !== -1) {
              setActiveVideoIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // 70% видимости для активации
      }
    );
    
    // Наблюдаем за всеми .video-container элементами
    document.querySelectorAll('.video-container').forEach(el => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });
    
    // Очистка при размонтировании
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [videos]);
  
  // Функция для регистрации элемента в Observer
  const registerObserver = useCallback((index: number) => (node: HTMLDivElement | null) => {
    if (node && observerRef.current) {
      node.setAttribute('data-video-id', videos[index].id.toString());
      observerRef.current.observe(node);
    }
  }, [videos]);
  
  // Обработка клавиатурной навигации
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && activeVideoIndex > 0) {
        // Прокрутка к предыдущему видео
        window.scrollTo({
          top: activeVideoIndex * window.innerHeight - window.innerHeight,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowDown' && activeVideoIndex < videos.length - 1) {
        // Прокрутка к следующему видео
        window.scrollTo({
          top: activeVideoIndex * window.innerHeight + window.innerHeight,
          behavior: 'smooth'
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoIndex, videos.length]);
  
  // Переключение сайдбара
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="bg-black min-h-screen" ref={containerRef}>
      {/* Кнопка возврата на главную */}
      <Link 
        to="/" 
        className="fixed top-4 left-4 z-50 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white transition-all duration-300 backdrop-blur-sm"
        aria-label="Home"
      >
        <Home className="h-6 w-6" />
      </Link>
      
      {/* Кнопка открытия сайдбара */}
      <button 
        className="fixed top-4 right-4 z-50 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white transition-all duration-300 backdrop-blur-sm"
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      {/* Сайдбар с превью видео */}
      <div className={`fixed right-0 top-0 bottom-0 w-full md:w-96 bg-slate-900 z-40 overflow-y-auto transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 pt-16">
          <h2 className="text-white text-xl font-bold mb-6">Video Shorts</h2>
          <VideoShortsList className="mb-8" />
          
          <h2 className="text-white text-xl font-bold mb-6">Popular Videos</h2>
          <div className="grid grid-cols-2 gap-4">
            {videos.map((video, index) => (
              <div 
                key={`sidebar-video-${video.id}`}
                className="cursor-pointer group"
                onClick={() => {
                  window.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' });
                  setSidebarOpen(false);
                }}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                  <img 
                    src={video.thumbnail || `https://placehold.co/400x225/1e293b/FFF?text=Video+${video.id}`}
                    alt={`Video ${video.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  {activeVideoIndex === index && (
                    <div className="absolute inset-0 border-2 border-indigo-500"></div>
                  )}
                </div>
                <p className="text-sm text-gray-300 truncate">Video {video.id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Фоновая музыка */}
      <BackgroundMusic audioUrl="/content/music_for_videos.mp3" />
      
      {/* Индикатор загрузки */}
      {loading && videos.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Сообщение об ошибке */}
      {error && videos.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      )}
      
      {/* Контейнер для видео с snap-прокруткой */}
      {videos.length > 0 && (
        <div className="snap-y snap-mandatory h-screen overflow-y-auto">
          {videos.map((video, index) => (
            <div
              key={`video-container-${video.id}`}
              className="video-container h-screen snap-start"
              data-video-id={video.id}
            >
              <VideoCard
                video={video}
                isActive={index === activeVideoIndex}
                observerRef={registerObserver(index)}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Индикатор навигации (точки справа) */}
      {videos.length > 0 && !sidebarOpen && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
          {videos.map((_, index) => (
            <button
              key={`nav-dot-${index}`}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeVideoIndex ? 'bg-white scale-150' : 'bg-white/50'
              }`}
              onClick={() => {
                window.scrollTo({
                  top: index * window.innerHeight,
                  behavior: 'smooth'
                });
              }}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoPage;
