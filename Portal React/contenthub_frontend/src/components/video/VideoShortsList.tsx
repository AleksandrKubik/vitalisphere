import React, { useState, useEffect } from 'react';
import { Play, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Типы данных
interface VideoShort {
  id: number;
  title: string;
  duration: string;
  views: number;
  thumbnail: string;
  videoUrl: string;
  createdAt: string;
  category?: string;
}

interface VideoShortsListProps {
  limit?: number;
  className?: string;
  variant?: 'shorts' | 'trending';
  title?: string;
  columns?: 2 | 3 | 4;
}

const VideoShortsList: React.FC<VideoShortsListProps> = ({ 
  limit = 8, 
  className = '',
  variant = 'shorts',
  title,
  columns = 4
}) => {
  const [shorts, setShorts] = useState<VideoShort[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Функция для форматирования чисел просмотров
  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };
  
  // Загрузка данных
  useEffect(() => {
    const fetchShorts = async () => {
      setLoading(true);
      
      try {
        // URL эндпоинта зависит от варианта
        const apiUrl = variant === 'trending' 
          ? '/api/videos/trending' 
          : '/api/videos/shorts';
        
        // Пытаемся получить данные с сервера
        const response = await axios.get(apiUrl);
        
        if (response.data && response.data.success) {
          setShorts(response.data.data.slice(0, limit));
        } else {
          // Резервные тестовые данные в зависимости от варианта
          let demoShorts: VideoShort[];
          
          if (variant === 'trending') {
            demoShorts = [
              {
                id: 1,
                title: "Ultimate Guide to Digital Photography",
                category: "Education",
                duration: "18:45",
                views: 325000,
                thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop",
                videoUrl: "/content/videos/video_1.mp4",
                createdAt: "2023-11-15T08:30:00Z"
              },
              {
                id: 2,
                title: "10 Most Beautiful Places on Earth",
                category: "Travel",
                duration: "24:12",
                views: 756000,
                thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop",
                videoUrl: "/content/videos/video_2.mp4",
                createdAt: "2023-11-12T14:20:00Z"
              },
              {
                id: 3,
                title: "How AI is Changing Our World",
                category: "Technology",
                duration: "21:28",
                views: 542500,
                thumbnail: "https://images.unsplash.com/photo-1677442135193-2387751d8fd0?q=80&w=400&auto=format&fit=crop",
                videoUrl: "/content/videos/video_3.mp4",
                createdAt: "2023-11-10T09:15:00Z"
              },
              {
                id: 4,
                title: "Mastering French Cuisine",
                category: "Cooking",
                duration: "35:03",
                views: 256000,
                thumbnail: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=400&auto=format&fit=crop",
                videoUrl: "/content/videos/video_4.mp4",
                createdAt: "2023-11-08T16:45:00Z"
              }
            ];
          } else {
            // Оригинальные демо-данные для коротких видео
            demoShorts = [
              {
                id: 1,
                title: "Amazing Ocean Life",
                duration: "1:45",
                views: 125000,
                thumbnail: "https://images.unsplash.com/photo-1682686580391-615fa7d1060a?q=80&w=400&auto=format&fit=crop",
                videoUrl: "/content/videos/short_1.mp4",
                createdAt: "2023-10-15T08:30:00Z"
              },
              {
                id: 2,
                title: "Mountain Trekking Adventure",
                duration: "2:20",
                views: 87000,
                thumbnail: "https://images.unsplash.com/photo-1682686580186-b55d2a91053c?q=80&w=400&auto=format&fit=crop",
                videoUrl: "/content/videos/short_2.mp4",
                createdAt: "2023-10-12T14:20:00Z"
              },
              {
                id: 3,
                title: "Urban Photography Tips",
                duration: "1:10",
                views: 42500,
                thumbnail: "https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?q=80&w=400&auto=format&fit=crop",
                videoUrl: "/content/videos/short_3.mp4",
                createdAt: "2023-10-10T09:15:00Z"
              },
              {
                id: 4,
                title: "Cooking with Fresh Herbs",
                duration: "2:05",
                views: 156000,
                thumbnail: "https://images.unsplash.com/photo-1682687220795-796d3f6f7000?q=80&w=400&auto=format&fit=crop",
                videoUrl: "/content/videos/short_4.mp4",
                createdAt: "2023-10-08T16:45:00Z"
              },
              {
                id: 5,
                title: "Modern Dance Tutorial",
                duration: "1:55",
                views: 93000,
                thumbnail: "https://images.unsplash.com/photo-1683009427479-c7e36bbb7bca?q=80&w=400&auto=format&fit=crop",
                videoUrl: "/content/videos/short_5.mp4",
                createdAt: "2023-10-05T11:30:00Z"
              },
              {
                id: 6,
                title: "Digital Art Workflow",
                duration: "2:30",
                views: 67000,
                thumbnail: "https://images.unsplash.com/photo-1683009427590-dd637b82457b?q=80&w=400&auto=format&fit=crop",
                videoUrl: "/content/videos/short_1.mp4",
                createdAt: "2023-10-03T13:20:00Z"
              },
              {
                id: 7,
                title: "Sunset Time-lapse",
                duration: "1:15",
                views: 217000,
                thumbnail: "https://images.unsplash.com/photo-1682687982470-8f1b7f5a1b18?q=80&w=400&auto=format&fit=crop",
                videoUrl: "/content/videos/short_2.mp4",
                createdAt: "2023-10-01T19:10:00Z"
              },
              {
                id: 8,
                title: "Street Food Journey",
                duration: "2:15",
                views: 132000,
                thumbnail: "https://images.unsplash.com/photo-1682687221363-72518513620e?q=80&w=400&auto=format&fit=crop", 
                videoUrl: "/content/videos/short_3.mp4",
                createdAt: "2023-09-28T12:45:00Z"
              }
            ];
          }
          
          setShorts(demoShorts.slice(0, limit));
          setError('Could not load videos from API, showing demo content');
        }
      } catch (err) {
        console.error(`Error fetching ${variant}:`, err);
        
        // Резервные тестовые данные при ошибке для разных вариантов
        let fallbackShorts: VideoShort[];
        
        if (variant === 'trending') {
          fallbackShorts = [
            {
              id: 1,
              title: "The Science Behind Dreaming",
              category: "Science",
              duration: "15:32",
              views: 283000,
              thumbnail: "https://images.unsplash.com/photo-1505771215590-c5fa0aec29b8?q=80&w=400&auto=format&fit=crop",
              videoUrl: "/content/videos/video_1.mp4",
              createdAt: "2023-11-14T08:30:00Z"
            },
            {
              id: 2,
              title: "Making Your Own Handmade Pasta",
              category: "Cooking",
              duration: "22:17",
              views: 420000,
              thumbnail: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=400&auto=format&fit=crop",
              videoUrl: "/content/videos/video_2.mp4",
              createdAt: "2023-11-11T14:20:00Z"
            },
            {
              id: 3,
              title: "Sustainable Architecture Designs",
              category: "Architecture",
              duration: "18:45",
              views: 195000,
              thumbnail: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=400&auto=format&fit=crop",
              videoUrl: "/content/videos/video_3.mp4",
              createdAt: "2023-11-08T09:15:00Z"
            },
            {
              id: 4,
              title: "A Journey Through European History",
              category: "History",
              duration: "27:33",
              views: 318000,
              thumbnail: "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?q=80&w=400&auto=format&fit=crop",
              videoUrl: "/content/videos/video_4.mp4",
              createdAt: "2023-11-05T16:45:00Z"
            }
          ];
        } else {
          // Используем оригинальные fallback данные для shorts
          fallbackShorts = [
            {
              id: 1,
              title: "Amazing Ocean Life",
              duration: "1:45",
              views: 125000,
              thumbnail: "https://images.unsplash.com/photo-1682686580391-615fa7d1060a?q=80&w=400&auto=format&fit=crop",
              videoUrl: "/content/videos/short_1.mp4",
              createdAt: "2023-10-15T08:30:00Z"
            },
            {
              id: 2,
              title: "Mountain Trekking Adventure",
              duration: "2:20",
              views: 87000,
              thumbnail: "https://images.unsplash.com/photo-1682686580186-b55d2a91053c?q=80&w=400&auto=format&fit=crop",
              videoUrl: "/content/videos/short_2.mp4",
              createdAt: "2023-10-12T14:20:00Z"
            },
            {
              id: 3,
              title: "Urban Photography Tips",
              duration: "1:10",
              views: 42500,
              thumbnail: "https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?q=80&w=400&auto=format&fit=crop",
              videoUrl: "/content/videos/short_3.mp4",
              createdAt: "2023-10-10T09:15:00Z"
            },
            {
              id: 4,
              title: "Cooking with Fresh Herbs",
              duration: "2:05",
              views: 156000,
              thumbnail: "https://images.unsplash.com/photo-1682687220795-796d3f6f7000?q=80&w=400&auto=format&fit=crop",
              videoUrl: "/content/videos/short_4.mp4",
              createdAt: "2023-10-08T16:45:00Z"
            },
            {
              id: 5,
              title: "Modern Dance Tutorial",
              duration: "1:55",
              views: 93000,
              thumbnail: "https://images.unsplash.com/photo-1683009427479-c7e36bbb7bca?q=80&w=400&auto=format&fit=crop",
              videoUrl: "/content/videos/short_5.mp4",
              createdAt: "2023-10-05T11:30:00Z"
            },
            {
              id: 6,
              title: "Digital Art Workflow",
              duration: "2:30",
              views: 67000,
              thumbnail: "https://images.unsplash.com/photo-1683009427590-dd637b82457b?q=80&w=400&auto=format&fit=crop",
              videoUrl: "/content/videos/short_1.mp4",
              createdAt: "2023-10-03T13:20:00Z"
            },
            {
              id: 7,
              title: "Sunset Time-lapse",
              duration: "1:15",
              views: 217000,
              thumbnail: "https://images.unsplash.com/photo-1682687982470-8f1b7f5a1b18?q=80&w=400&auto=format&fit=crop",
              videoUrl: "/content/videos/short_2.mp4",
              createdAt: "2023-10-01T19:10:00Z"
            },
            {
              id: 8,
              title: "Street Food Journey",
              duration: "2:15",
              views: 132000,
              thumbnail: "https://images.unsplash.com/photo-1682687221363-72518513620e?q=80&w=400&auto=format&fit=crop", 
              videoUrl: "/content/videos/short_3.mp4",
              createdAt: "2023-09-28T12:45:00Z"
            }
          ];
        }
        
        setShorts(fallbackShorts.slice(0, limit));
        setError('Could not load videos from API, showing demo content');
      } finally {
        setLoading(false);
      }
    };
    
    fetchShorts();
  }, [limit, variant]);
  
  // Определяем количество колонок для сетки
  const getGridColumns = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-2 md:grid-cols-3';
      case 4: 
      default: return 'grid-cols-2 md:grid-cols-4';
    }
  };
  
  // Обработка состояния загрузки
  if (loading) {
    return (
      <div className={`grid ${getGridColumns()} gap-4 ${className}`}>
        {Array.from({ length: limit }).map((_, i) => (
          <div key={`skeleton-${i}`} className="animate-pulse">
            <div className="relative aspect-video rounded-lg bg-slate-700 mb-2"></div>
            <div className="h-4 bg-slate-700 rounded mb-2 w-2/3"></div>
            <div className="h-3 bg-slate-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }
  
  // Разное отображение для разных вариантов
  const renderItem = (short: VideoShort, index: number) => {
    if (variant === 'trending') {
      // Для trending - больше информации, горизонтальные карточки
      return (
        <Link 
          key={short.id} 
          to={`/videos/${short.id}`} 
          className="group flex gap-3 rounded-lg overflow-hidden transition-all duration-300 hover:bg-slate-800 p-2"
        >
          <div className="relative w-32 md:w-48 aspect-video overflow-hidden rounded-lg flex-shrink-0">
            {/* Миниатюра */}
            <img 
              src={short.thumbnail} 
              alt={short.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/400x225/1e293b/FFF?text=Video+${short.id}`;
              }}
            />
            
            {/* Оверлей с иконкой воспроизведения */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Play className="h-5 w-5 text-white fill-white" />
              </div>
            </div>
            
            {/* Продолжительность видео */}
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {short.duration}
            </div>
          </div>
          
          <div className="flex-1 py-1">
            <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-500 transition-colors">
              {short.title}
            </h3>
            
            {short.category && (
              <span className="inline-block text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded mt-1">
                {short.category}
              </span>
            )}
            
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {formatViews(short.views)} views
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-400"></span>
              <span>{new Date(short.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </Link>
      );
    }
    
    // Для коротких видео - классическое отображение в сетке
    return (
      <Link 
        key={short.id} 
        to={`/videos/shorts/${short.id}`} 
        className="group rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
      >
        <div className="relative aspect-video overflow-hidden rounded-lg">
          {/* Миниатюра */}
          <img 
            src={short.thumbnail} 
            alt={short.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://placehold.co/400x225/1e293b/FFF?text=Video+${short.id}`;
            }}
          />
          
          {/* Оверлей с иконкой воспроизведения */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
          </div>
          
          {/* Продолжительность видео */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {short.duration}
          </div>
        </div>
        
        {/* Информация о видео */}
        <div className="pt-2">
          <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-500 transition-colors">
            {short.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {formatViews(short.views)} views
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
            <span>{new Date(short.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </Link>
    );
  };
  
  return (
    <div className={`${className}`}>
      {title && <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>}
      {error && <p className="text-amber-500 text-sm mb-2">{error}</p>}
      
      {variant === 'trending' ? (
        <div className="space-y-4">
          {shorts.map((short, index) => renderItem(short, index))}
        </div>
      ) : (
        <div className={`grid ${getGridColumns()} gap-4`}>
          {shorts.map((short, index) => renderItem(short, index))}
        </div>
      )}
    </div>
  );
};

export default VideoShortsList; 