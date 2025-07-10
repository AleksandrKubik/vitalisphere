import React, { useState, useEffect } from 'react';
import { Play, Pause, Clock, Heart, MoreHorizontal, Music } from 'lucide-react';
import axios from 'axios';

// Типы данных
interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
  isFavorite: boolean;
}

interface TrackListProps {
  limit?: number;
  className?: string;
  showHeader?: boolean;
}

const TrackList: React.FC<TrackListProps> = ({ 
  limit = 10, 
  className = '',
  showHeader = true 
}) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  // Создание аудио-элемента при монтировании компонента
  useEffect(() => {
    const audio = new Audio();
    setAudioElement(audio);
    
    // Очистка при размонтировании
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);
  
  // Загрузка данных
  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      
      try {
        // Пытаемся получить данные с сервера
        const response = await axios.get('/api/music/tracks');
        
        if (response.data && response.data.success) {
          setTracks(response.data.data.slice(0, limit));
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err) {
        console.error('Error fetching music tracks:', err);
        
        // Резервные тестовые данные при ошибке
        const fallbackTracks: Track[] = [
          {
            id: 1,
            title: "Midnight Dreams",
            artist: "Luna Ray",
            album: "Ethereal Journey",
            duration: "3:45",
            coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=300&auto=format&fit=crop",
            audioUrl: "/content/music/tracks/track_1.mp3",
            isFavorite: false
          },
          {
            id: 2,
            title: "Ocean Waves",
            artist: "Aqua Soul",
            album: "Tranquil Waters",
            duration: "4:12",
            coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop",
            audioUrl: "/content/music/tracks/track_2.mp3",
            isFavorite: true
          },
          {
            id: 3,
            title: "Urban Rhythm",
            artist: "City Beats",
            album: "Metropolitan",
            duration: "3:28",
            coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop",
            audioUrl: "/content/music/tracks/track_3.mp3",
            isFavorite: false
          },
          {
            id: 4,
            title: "Forest Whispers",
            artist: "Nature Sound",
            album: "Woodland Tales",
            duration: "5:03",
            coverUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=300&auto=format&fit=crop",
            audioUrl: "/content/music/tracks/track_4.mp3",
            isFavorite: false
          },
          {
            id: 5,
            title: "Cosmic Voyage",
            artist: "Stellar Minds",
            album: "Interstellar",
            duration: "4:36",
            coverUrl: "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?q=80&w=300&auto=format&fit=crop",
            audioUrl: "/content/music/tracks/track_5.mp3",
            isFavorite: true
          },
          {
            id: 6,
            title: "Electric Sunset",
            artist: "Neon Wave",
            album: "Synthscape",
            duration: "3:52",
            coverUrl: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=300&auto=format&fit=crop",
            audioUrl: "/content/music/tracks/track_1.mp3",
            isFavorite: false
          },
          {
            id: 7,
            title: "Desert Mirage",
            artist: "Sandy Dunes",
            album: "Oasis",
            duration: "4:18",
            coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=300&auto=format&fit=crop",
            audioUrl: "/content/music/tracks/track_2.mp3",
            isFavorite: false
          },
          {
            id: 8,
            title: "Mountain Echo",
            artist: "Alpine Sounds",
            album: "Summit",
            duration: "5:27",
            coverUrl: "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?q=80&w=300&auto=format&fit=crop",
            audioUrl: "/content/music/tracks/track_3.mp3",
            isFavorite: true
          },
          {
            id: 9,
            title: "Jazz Café",
            artist: "Smooth Quartet",
            album: "Evening Moods",
            duration: "4:05",
            coverUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=300&auto=format&fit=crop",
            audioUrl: "/content/music/tracks/track_4.mp3",
            isFavorite: false
          },
          {
            id: 10,
            title: "Rainy Day",
            artist: "Melancholy Skies",
            album: "Precipitation",
            duration: "3:39",
            coverUrl: "https://images.unsplash.com/photo-1428908799722-0a74e26ce7f6?q=80&w=300&auto=format&fit=crop",
            audioUrl: "/content/music/tracks/track_5.mp3",
            isFavorite: false
          }
        ];
        
        setTracks(fallbackTracks.slice(0, limit));
        setError('Could not load tracks from API, showing demo content');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTracks();
  }, [limit]);
  
  // Обработчик клика по треку
  const handlePlayTrack = (trackId: number) => {
    if (!audioElement) return;
    
    // Если кликнули на текущий трек
    if (currentTrack === trackId) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Если кликнули на новый трек
      const track = tracks.find(t => t.id === trackId);
      if (track) {
        audioElement.src = track.audioUrl;
        audioElement.play().catch(err => {
          console.error('Error playing audio:', err);
          // Обработка ошибки воспроизведения
        });
        setCurrentTrack(trackId);
        setIsPlaying(true);
      }
    }
  };
  
  // Переключение избранного статуса трека
  const toggleFavorite = (e: React.MouseEvent, trackId: number) => {
    e.stopPropagation(); // Предотвращаем воспроизведение трека
    
    setTracks(prevTracks => 
      prevTracks.map(track => 
        track.id === trackId 
          ? { ...track, isFavorite: !track.isFavorite } 
          : track
      )
    );
    
    // Отправляем запрос на сервер (в реальном приложении)
    // axios.post(`/api/music/tracks/${trackId}/favorite`);
  };
  
  // Скелет загрузки
  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        {showHeader && (
          <div className="flex items-center gap-4 mb-6 px-4">
            <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
            <div>
              <div className="h-5 bg-slate-700 rounded w-40 mb-2"></div>
              <div className="h-4 bg-slate-700 rounded w-24"></div>
            </div>
          </div>
        )}
        
        <div className="rounded-lg overflow-hidden">
          {Array.from({ length: Math.min(limit, 5) }).map((_, i) => (
            <div key={`skeleton-${i}`} className="flex items-center p-3 border-b border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 bg-slate-700 rounded mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-700 rounded mb-2 w-2/3"></div>
                <div className="h-3 bg-slate-700 rounded w-1/2"></div>
              </div>
              <div className="w-16 h-4 bg-slate-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className={className}>
      {error && <p className="text-amber-500 text-sm mb-2">{error}</p>}
      
      {showHeader && (
        <div className="flex items-center gap-4 mb-6 px-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
            <Music className="text-white h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Popular Tracks</h2>
            <p className="text-sm text-slate-500">{tracks.length} tracks</p>
          </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm">
        {/* Заголовки таблицы */}
        <div className="grid grid-cols-12 gap-2 p-3 border-b border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">TITLE</div>
          <div className="col-span-3">ALBUM</div>
          <div className="col-span-2">ARTIST</div>
          <div className="col-span-1 text-center">
            <Clock className="h-3 w-3 mx-auto" />
          </div>
        </div>
        
        {/* Список треков */}
        {tracks.map((track, index) => (
          <div 
            key={track.id}
            className={`grid grid-cols-12 gap-2 p-3 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer group transition-colors ${currentTrack === track.id && isPlaying ? 'bg-slate-100 dark:bg-slate-700/70' : ''}`}
            onClick={() => handlePlayTrack(track.id)}
          >
            <div className="col-span-1 flex items-center justify-center">
              <div className="relative w-6 h-6 flex items-center justify-center">
                {currentTrack === track.id && isPlaying ? (
                  <Pause className="h-4 w-4 text-indigo-600 absolute inset-0 m-auto" />
                ) : (
                  <>
                    <span className={`${currentTrack === track.id || index === 0 ? 'opacity-0' : ''} group-hover:opacity-0 text-sm`}>{index + 1}</span>
                    <Play className={`h-4 w-4 text-indigo-600 absolute inset-0 m-auto ${currentTrack === track.id && !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  </>
                )}
              </div>
            </div>
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={track.coverUrl} 
                  alt={`${track.title} cover`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/400x400/1e293b/FFF?text=Music";
                  }}
                />
              </div>
              <div className="truncate">
                <div className="font-medium truncate">{track.title}</div>
              </div>
            </div>
            <div className="col-span-3 flex items-center truncate">{track.album}</div>
            <div className="col-span-2 flex items-center truncate">{track.artist}</div>
            <div className="col-span-1 flex items-center justify-end gap-2 text-sm">
              <Heart 
                className={`h-4 w-4 cursor-pointer ${track.isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                onClick={(e) => toggleFavorite(e, track.id)}
              />
              <span>{track.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackList; 