import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X, Film, Video } from 'lucide-react';
import axios from 'axios';
import VideoPlayer from '../components/video2/VideoPlayer';
import VideoShortsList from '../components/video/VideoShortsList';

// Импортируем стили
import '../components/video2/styles.css';

// Тип для видео
interface Video {
  id: number;
  title: string;
  videoUrl: string;
  coverColor?: string;
}

// Тип для ответа API
interface ApiResponse {
  success: boolean;
  data: {
    id: number;
    title: string;
    video_url: string;
    cover_color?: string;
  }[];
}

const Video2Page: React.FC = () => {
  // Состояния компонента
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'shorts' | 'trending'>('shorts');
  
  // Получение тестовых видео для быстрой загрузки
  const getTestVideos = (): Video[] => {
    console.log("Loading test videos");
    return [
      {
        id: 1,
        title: 'Природа и горы',
        videoUrl: '/content/videos/videos_1.mp4',
        coverColor: '#4f46e5' // Indigo
      },
      {
        id: 2,
        title: 'Городской пейзаж',
        videoUrl: '/content/videos/videos_2.mp4',
        coverColor: '#16a34a' // Green
      },
      {
        id: 3,
        title: 'Морской закат',
        videoUrl: '/content/videos/videos_3.mp4',
        coverColor: '#ef4444' // Red
      },
      {
        id: 4,
        title: 'Дикая природа',
        videoUrl: '/content/videos/videos_4.mp4',
        coverColor: '#8b5cf6' // Violet
      },
      {
        id: 5,
        title: 'Космические просторы',
        videoUrl: '/content/videos/videos_5.mp4',
        coverColor: '#0ea5e9' // Sky blue
      }
    ];
  };
  
  // Загрузка видео при монтировании компонента
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log("Starting to fetch videos");
        // Сначала устанавливаем тестовые видео для быстрой загрузки
        const testVideos = getTestVideos();
        setVideos(testVideos);
        setLoading(false);
        
        // Асинхронно пытаемся загрузить видео из API
        try {
          console.log("Fetching from API");
          const response = await axios.get<ApiResponse>('/api/videos');
          
          if (response.data.success && response.data.data.length > 0) {
            // Преобразуем данные API в формат видео
            const apiVideos = response.data.data.map(video => ({
              id: video.id,
              title: video.title || `Видео ${video.id}`,
              videoUrl: video.video_url,
              coverColor: video.cover_color || getRandomColor()
            }));
            
            console.log(`Successfully loaded ${apiVideos.length} videos from API`);
            
            // Обновляем видео из API
            setVideos(apiVideos);
          } else {
            console.log("API returned success=false or empty data");
          }
        } catch (apiError) {
          console.error('API error:', apiError);
          // Мы уже отображаем тестовые видео, так что не показываем ошибку
        }
      } catch (err) {
        console.error('Error initializing video page:', err);
        setError('Failed to load videos');
      }
    };
    
    fetchVideos();
  }, []);
  
  // Функция для генерации случайного цвета
  const getRandomColor = (): string => {
    const colors = [
      '#4f46e5', // Indigo
      '#16a34a', // Green
      '#ef4444', // Red
      '#8b5cf6', // Violet
      '#0ea5e9', // Sky blue
      '#f59e0b', // Amber
      '#ec4899', // Pink
      '#14b8a6'  // Teal
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Переключение сайдбара
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Фон с эффектом точек */}
      <div className="video-dots-background"></div>
      
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
      
      {/* Сайдбар со списком видео */}
      <div className={`fixed right-0 top-0 bottom-0 w-full md:w-96 bg-slate-900 z-40 overflow-y-auto transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 pt-16">
          {/* Вкладки для переключения между разделами */}
          <div className="flex items-center space-x-2 mb-6 border-b border-slate-700">
            <button 
              className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'shorts' ? 'text-white border-b-2 border-red-500' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setActiveTab('shorts')}
            >
              <Film className="h-4 w-4 mr-2" />
              Shorts
            </button>
            <button 
              className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'trending' ? 'text-white border-b-2 border-red-500' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setActiveTab('trending')}
            >
              <Video className="h-4 w-4 mr-2" />
              Trending
            </button>
          </div>
          
          {/* Содержимое вкладки Shorts */}
          {activeTab === 'shorts' && (
            <VideoShortsList 
              variant="shorts" 
              columns={4} 
              limit={8} 
              className="mb-8"
              title="Video Shorts"
            />
          )}
          
          {/* Содержимое вкладки Trending */}
          {activeTab === 'trending' && (
            <VideoShortsList 
              variant="trending" 
              limit={5} 
              className="mb-8"
              title="Trending Videos"
            />
          )}
        </div>
      </div>
      
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
      
      {/* Видеоплеер */}
      {videos.length > 0 && (
        <div className="w-full mx-auto px-2 sm:px-4" data-videos-count={videos.length}>
          <VideoPlayer videos={videos} />
        </div>
      )}
    </div>
  );
};

export default Video2Page;
