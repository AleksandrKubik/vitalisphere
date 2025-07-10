import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import axios from 'axios';
import RadioPlayer from '../components/music/radio/RadioPlayer';
import TrackList from '../components/music/TrackList';

// Импортируем стили
import '../components/music/radio/styles.css';

// Тип для трека
interface Track {
  id: number;
  title: string;
  audioUrl: string;
  coverColor?: string;
}

// Тип для ответа API
interface ApiResponse {
  success: boolean;
  data: {
    id: number;
    title: string;
    audio_url: string;
    cover_color: string;
  }[];
}

const MusicPage: React.FC = () => {
  // Состояния компонента
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Получение тестовых треков для быстрой загрузки
  const getTestTracks = (): Track[] => {
    console.log("Loading test tracks");
    return [
      {
        id: 1,
        title: 'Le Soleil et La Lune',
        audioUrl: '/content/music/tracks/Le-Soleil-et-La-Lune.mp3',
        coverColor: '#4f46e5' // Indigo
      },
      {
        id: 2,
        title: 'Apuntes',
        audioUrl: '/content/music/tracks/Apuntes.mp3',
        coverColor: '#16a34a' // Green
      },
      {
        id: 3,
        title: 'Come On',
        audioUrl: '/content/music/tracks/Come-On.mp3',
        coverColor: '#ef4444' // Red
      },
      {
        id: 4,
        title: 'I Get No Sleep',
        audioUrl: '/content/music/tracks/I-Get-No-Sleep.mp3',
        coverColor: '#8b5cf6' // Violet
      }
    ];
  };
  
  // Загрузка треков при монтировании компонента
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        console.log("Starting to fetch tracks");
        // Сначала устанавливаем тестовые треки для быстрой загрузки
        const testTracks = getTestTracks();
        setTracks(testTracks);
        setLoading(false);
        
        // Асинхронно пытаемся загрузить треки из API
        try {
          console.log("Fetching from API");
          const response = await axios.get<ApiResponse>('/api/music');
          
          if (response.data.success && response.data.data.length > 0) {
            // Преобразуем данные API в формат треков
            const apiTracks = response.data.data.map(track => ({
              id: track.id,
              title: track.title,
              audioUrl: track.audio_url,
              coverColor: track.cover_color
            }));
            
            console.log(`Successfully loaded ${apiTracks.length} tracks from API`);
            
            // Обновляем треки из API
            setTracks(apiTracks);
          } else {
            console.log("API returned success=false or empty data");
          }
        } catch (apiError) {
          console.error('API error:', apiError);
          // Мы уже отображаем тестовые треки, так что не показываем ошибку
        }
      } catch (err) {
        console.error('Error initializing music page:', err);
        setError('Failed to load music');
      }
    };
    
    fetchTracks();
  }, []);
  
  // Переключение сайдбара
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="bg-black min-h-screen relative">
      {/* Фон с эффектом музыкальных нот */}
      <div className="music-notes-background"></div>
      
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
      
      {/* Сайдбар со списком треков */}
      <div className={`fixed right-0 top-0 bottom-0 w-full md:w-96 bg-slate-900 z-40 overflow-y-auto transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 pt-16">
          <h2 className="text-white text-xl font-bold mb-6">Music Library</h2>
          <TrackList className="mb-8" />
        </div>
      </div>
      
      {/* Индикатор загрузки */}
      {loading && tracks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Сообщение об ошибке */}
      {error && tracks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      )}
      
      {/* Радио-плеер */}
      {tracks.length > 0 && (
        <div className="relative" data-tracks-count={tracks.length}>
          <RadioPlayer tracks={tracks} />
        </div>
      )}
    </div>
  );
};

export default MusicPage;
