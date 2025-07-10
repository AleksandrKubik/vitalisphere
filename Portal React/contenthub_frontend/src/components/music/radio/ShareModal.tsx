import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackInfo: {
    id: number;
    title: string;
    artist: string;
  };
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  trackInfo
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen) return null;

  // Генерируем текст для шаринга
  const shareText = `Слушаю "${trackInfo.title}" - ${trackInfo.artist} на ContentHub Radio!`;
  
  // Обработчик копирования в буфер обмена
  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => console.error('Не удалось скопировать текст: ', err));
  };
  
  // Обработчики шаринга в соцсети
  const handleShare = (platform: string) => {
    // В реальном приложении здесь была бы логика интеграции с соцсетями
    console.log(`Поделиться в ${platform}: ${shareText}`);
    
    // Имитация шаринга
    setTimeout(onClose, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-gray-900 rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Поделиться треком</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Информация о треке */}
        <div className="p-6 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-b border-gray-800">
          <h4 className="font-bold text-xl text-white mb-1">{trackInfo.title}</h4>
          <p className="text-gray-300">{trackInfo.artist}</p>
        </div>
        
        {/* Копирование ссылки */}
        <div className="p-4 border-b border-gray-800">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={shareText}
              readOnly
              className="w-full py-3 px-4 pr-24 bg-gray-800 rounded-lg text-gray-300 text-sm focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`absolute right-2 px-4 py-1 rounded-md ${
                copySuccess 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } transition-colors text-sm`}
            >
              {copySuccess ? (
                <span className="flex items-center">
                  <Check className="h-4 w-4 mr-1" />
                  Скопировано
                </span>
              ) : (
                'Копировать'
              )}
            </button>
          </div>
        </div>
        
        {/* Соцсети */}
        <div className="p-4">
          <h4 className="text-sm text-gray-400 mb-3">Поделиться в соцсетях</h4>
          <div className="grid grid-cols-4 gap-2">
            {/* Telegram */}
            <button
              onClick={() => handleShare('Telegram')}
              className="flex flex-col items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 mb-2">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.05 2.28c-.3-.15-.65-.2-1-.15 0 0-18.05 6.25-18.5 6.9-.2.35-.15.8.1 1.1.25.35.65.55 1.05.5l5.2-1.15v3.35c0 .25.1.5.25.7.3.4.8.5 1.2.25l2.05-1.45 3.15 2.6c.2.15.45.25.7.25.1 0 .2 0 .3-.05.35-.1.6-.35.7-.7l3-17.5c.1-.5-.1-1-.95-1.15zM6.05 9.8l9.9-5-7.55 7v-2z" fill="currentColor" />
                </svg>
              </span>
              <span className="text-xs text-gray-300">Telegram</span>
            </button>
            
            {/* VK */}
            <button
              onClick={() => handleShare('VK')}
              className="flex flex-col items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 mb-2">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12ZM13.7437 15.5C16.3648 15.5 18.1648 13.2437 18.1648 10.4782C18.1648 10.3498 18.161 10.2233 18.1536 10.0989H16.9468C16.9562 10.2214 16.9611 10.3458 16.9611 10.4721C16.9611 12.6371 15.6253 14.2963 13.7437 14.2963C11.8621 14.2963 10.5264 12.6371 10.5264 10.4721C10.5264 8.30713 11.8621 6.64788 13.7437 6.64788C14.7387 6.64788 15.5963 7.10748 16.1635 7.88503L17.1115 7.20723C16.3262 6.14578 15.1115 5.5 13.7437 5.5C11.1887 5.5 9.32275 7.71261 9.32275 10.4721C9.32275 13.2315 11.1887 15.5 13.7437 15.5ZM7.75 9.25C7.33579 9.25 7 9.58579 7 10V15.25C7 15.6642 7.33579 16 7.75 16C8.16421 16 8.5 15.6642 8.5 15.25V10C8.5 9.58579 8.16421 9.25 7.75 9.25Z" fill="currentColor"/>
                </svg>
              </span>
              <span className="text-xs text-gray-300">ВКонтакте</span>
            </button>
            
            {/* Twitter/X */}
            <button
              onClick={() => handleShare('Twitter')}
              className="flex flex-col items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-black mb-2">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.2439 2H21.5519L14.2939 10.3L22.7999 22H16.1709L10.9624 14.9769L4.96786 22H1.65186L9.46586 13.0538L1.19986 2H7.99186L12.7349 8.50615L18.2439 2ZM17.0829 20.0615H18.9389L6.92386 3.84615H4.93786L17.0829 20.0615Z" fill="currentColor"/>
                </svg>
              </span>
              <span className="text-xs text-gray-300">X</span>
            </button>
            
            {/* WhatsApp */}
            <button
              onClick={() => handleShare('WhatsApp')}
              className="flex flex-col items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 mb-2">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.4154 14.4579C17.1846 14.3421 15.7846 13.6579 15.5846 13.5737C15.3846 13.5053 15.2308 13.4684 15.0769 13.6842C14.9231 13.9158 14.3846 14.5263 14.2615 14.6842C14.1385 14.8421 14.0154 14.8632 13.7846 14.7474C13.5538 14.6158 12.6154 14.3158 11.5385 13.3684C10.6769 12.6316 10.1077 11.7263 9.98462 11.4947C9.86154 11.2632 9.96923 11.1474 10.0923 11.0316C10.2 10.9368 10.3385 10.7789 10.4615 10.6632C10.5846 10.5474 10.6154 10.4632 10.6923 10.3211C10.7692 10.1789 10.7385 10.0632 10.6769 9.94737C10.6154 9.83158 10.0462 8.47368 9.84615 8.01053C9.64615 7.54737 9.44615 7.61053 9.32308 7.61053C9.2 7.61053 9.06154 7.58947 8.90769 7.58947C8.75385 7.58947 8.50769 7.64737 8.30769 7.87895C8.10769 8.11053 7.38462 8.79474 7.38462 10.1368C7.38462 11.4789 8.36923 12.7789 8.49231 12.9211C8.61538 13.0632 10.0462 15.3789 12.3231 16.5474C12.9692 16.8263 13.4769 16.9895 13.8769 17.1158C14.5385 17.3263 15.1385 17.2947 15.6154 17.2368C16.1538 17.1632 17.2923 16.5474 17.4923 16.0C17.6923 15.4526 17.6923 15 17.6308 14.8842C17.5692 14.7684 17.4154 14.7105 17.2 14.5947L17.4154 14.4579ZM12.0615 21.8526H12.0462C10.3692 21.8526 8.72308 21.3947 7.32308 20.5421L6.96923 20.3368L3.4 21.3368L4.41538 17.8737L4.18462 17.5053C3.25385 16.0632 2.76923 14.3684 2.76923 12.6316C2.76923 7.24211 7.15385 2.84211 12.0769 2.84211C14.4615 2.84211 16.7077 3.77895 18.4 5.47368C19.2308 6.28421 19.8923 7.25263 20.3385 8.31579C20.7846 9.37895 21.0154 10.5158 21.0154 11.6842C21 17.0737 16.6154 21.8526 12.0615 21.8526ZM20.0615 3.81053C18.0769 1.82105 15.4769 0.736832 12.7077 0.736832C6.43077 0.736832 1.23077 5.93684 1.23077 12.2105C1.23077 14.2421 1.76923 16.2316 2.76923 18L1 24L7.16923 22.2316C8.86154 23.1368 10.7385 23.6105 12.6769 23.6105H12.6923C19.0692 23.6105 24 18.4105 24 12.1368C24 9.36842 22.9846 6.77895 21 4.78947L20.0615 3.81053Z" fill="currentColor"/>
                </svg>
              </span>
              <span className="text-xs text-gray-300">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;