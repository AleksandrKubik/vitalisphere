import { useState } from 'react';
import { X, Send } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  authorAvatar?: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface CommentsPanelProps {
  videoId: number;
  isOpen: boolean;
  onClose: () => void;
}

const CommentsPanel = ({ videoId, isOpen, onClose }: CommentsPanelProps) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Алексей Иванов',
      authorAvatar: '/avatars/user1.jpg',
      text: 'Очень полезное видео! Использовал эти советы в своем проекте, и это сразу дало результаты.',
      timestamp: '2 часа назад',
      likes: 24
    },
    {
      id: 2,
      author: 'Мария Смирнова',
      authorAvatar: '/avatars/user2.jpg',
      text: 'А можно пример использования этой техники для мобильных приложений?',
      timestamp: '1 день назад',
      likes: 15
    },
    {
      id: 3,
      author: 'Дмитрий Петров',
      authorAvatar: '/avatars/user3.jpg',
      text: 'Не согласен с пунктом про оптимизацию. Есть более эффективные подходы.',
      timestamp: '3 дня назад',
      likes: 7
    }
  ]);

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now(),
      author: 'Вы',
      authorAvatar: '/avatars/you.jpg',
      text: commentText,
      timestamp: 'Только что',
      likes: 0
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex justify-end">
      <div className="w-full md:w-96 h-full bg-gray-900 text-white flex flex-col shadow-lg transform transition-transform duration-300">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Комментарии</h2>
          <button 
            className="p-2 rounded-full hover:bg-gray-800"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Список комментариев */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-800 pb-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                    {comment.authorAvatar && (
                      <img src={comment.authorAvatar} alt={comment.author} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-baseline">
                      <span className="font-medium">{comment.author}</span>
                      <span className="ml-2 text-xs text-gray-400">{comment.timestamp}</span>
                    </div>
                    <p className="mt-1 text-sm">{comment.text}</p>
                    <div className="mt-2 flex text-xs text-gray-400">
                      <button className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {comment.likes}
                      </button>
                      <button className="ml-4">Ответить</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              Пока нет комментариев. Будьте первым!
            </div>
          )}
        </div>
        
        {/* Форма добавления комментария */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0">
              <img src="/avatars/you.jpg" alt="Вы" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex-1 ml-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Добавьте комментарий..."
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm resize-none"
                rows={2}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button
                  className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                >
                  <Send className="h-4 w-4 mr-1" />
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsPanel;