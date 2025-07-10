import { X } from 'lucide-react';

interface SharePanelProps {
  videoId: number;
  isOpen: boolean;
  onClose: () => void;
}

const SharePanel = ({ videoId, isOpen, onClose }: SharePanelProps) => {
  if (!isOpen) return null;

  const handleShare = (platform: string) => {
    // URL текущего видео для шаринга
    const videoUrl = `${window.location.origin}/video/${videoId}`;
    
    // В реальном приложении здесь можно реализовать логику шаринга через API соответствующих соцсетей
    // Для примера просто показываем уведомление
    alert(`Делимся видео в ${platform}: ${videoUrl}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end justify-center">
      <div className="w-full max-w-md bg-gray-900 text-white rounded-t-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Поделиться</h2>
          <button
            className="p-2 rounded-full hover:bg-gray-800"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* Telegram */}
          <button
            className="flex flex-col items-center"
            onClick={() => handleShare('Telegram')}
          >
            <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center mb-2">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22.05 2.28c-.3-.15-.65-.2-1-.15 0 0-18.05 6.25-18.5 6.9-.2.35-.15.8.1 1.1.25.35.65.55 1.05.5l5.2-1.15v3.35c0 .25.1.5.25.7.3.4.8.5 1.2.25l2.05-1.45 3.15 2.6c.2.15.45.25.7.25.1 0 .2 0 .3-.05.35-.1.6-.35.7-.7l3-17.5c.1-.5-.1-1-.95-1.15zM6.05 9.8l9.9-5-7.55 7v-2z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm">Telegram</span>
          </button>

          {/* WhatsApp */}
          <button
            className="flex flex-col items-center"
            onClick={() => handleShare('WhatsApp')}
          >
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mb-2">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17.5 14.38l.9-.79a1 1 0 0 0 0-1.42l-2.06-2.17a1 1 0 0 0-1.4 0l-.91.8a11.36 11.36 0 0 1-5-5l.8-.91a1 1 0 0 0 0-1.41L7.62 1.62a1 1 0 0 0-1.41 0l-.8.91c-3.13 3.55-2.48 7.85.55 11.71 3 3.83 7.3 4.48 10.83 1.35l.71-.72z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm">WhatsApp</span>
          </button>

          {/* Вконтакте */}
          <button
            className="flex flex-col items-center"
            onClick={() => handleShare('VK')}
          >
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mb-2">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2z" fill="currentColor" />
                <path d="M18.5 8h-1.1c-.8 0-1.1.5-1.1 1.1 0 0 0 .2-.2.5-.2.5-.7 1.1-1.4 1.1-.7 0-1.1-.5-1.1-1.3V8h-2.1v2.7c0 .3.1.5.2.7-.1.5.1.9.5 1.2.4.3 1 .4 1.6.4h.2c.7 0 1.4-.3 1.8-.8v.7h2.1v-5h-1.3z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm">ВКонтакте</span>
          </button>

          {/* Twitter/X */}
          <button
            className="flex flex-col items-center"
            onClick={() => handleShare('Twitter')}
          >
            <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mb-2">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2-5-.5-7-3-7-5 1.6.2 2.6 0 3-1-5.4-.8-7-4-6-7 1.8.7 3 .7 3 0-4-2.3-5-7.2-2-10 6.2 7 13.8 7 14 2 1 0 2 0 2-1 1 .5 1.8 1.1 2 2z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm">Twitter</span>
          </button>

          {/* Copy Link */}
          <button
            className="flex flex-col items-center"
            onClick={() => {
              const videoUrl = `${window.location.origin}/video/${videoId}`;
              navigator.clipboard.writeText(videoUrl);
              alert('Ссылка скопирована в буфер обмена');
              onClose();
            }}
          >
            <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mb-2">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </div>
            <span className="text-sm">Копировать</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePanel;