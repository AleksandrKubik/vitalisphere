import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AnchorScroll: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Проверяем, есть ли якорь в URL
    if (location.hash) {
      // Убираем символ # из начала
      const elementId = location.hash.substring(1);
      
      // Находим элемент по ID
      const element = document.getElementById(elementId);
      
      if (element) {
        // Добавляем небольшую задержку для корректной прокрутки
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location.hash]);

  return null;
};

export default AnchorScroll; 