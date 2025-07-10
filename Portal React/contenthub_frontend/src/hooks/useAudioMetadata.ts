import { useState, useEffect } from 'react';
import * as mmb from 'music-metadata-browser';

interface AudioMetadata {
  title?: string;
  artist?: string;
  album?: string;
  picture?: string;
  duration?: number;
}


export function useAudioMetadata(audioUrl: string): {
  metadata: AudioMetadata | null;
  isLoading: boolean;
  error: Error | null;
} {
  const [metadata, setMetadata] = useState<AudioMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const fetchMetadata = async () => {
      try {
        // Получаем метаданные из аудиофайла
        const parsedMetadata = await mmb.fetchFromUrl(audioUrl);
        
        if (!isMounted) return;

        // Извлекаем нужные данные
        const { common, format } = parsedMetadata;
        
        // Преобразуем обложку в URL данных, если она есть
        let pictureUrl: string | undefined;
        if (common.picture && common.picture.length > 0) {
          const picture = common.picture[0];
          const blob = new Blob([picture.data], { type: picture.format });
          pictureUrl = URL.createObjectURL(blob);
        }

        setMetadata({
          title: common.title,
          artist: common.artist,
          album: common.album,
          picture: pictureUrl,
          duration: format.duration
        });
      } catch (err) {
        if (!isMounted) return;
        console.error('Ошибка при получении метаданных:', err);
        setError(err instanceof Error ? err : new Error('Неизвестная ошибка'));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMetadata();

    return () => {
      isMounted = false;
      // Освобождаем URL объекты при размонтировании компонента
      if (metadata?.picture) {
        URL.revokeObjectURL(metadata.picture);
      }
    };
  }, [audioUrl]);

  return { metadata, isLoading, error };
}
