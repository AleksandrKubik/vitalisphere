import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Bookmark, ChevronLeft, ChevronRight, Tag, User, Loader } from 'lucide-react';
import { useState, useEffect } from 'react';
import ArticleContent from '../components/articles/ArticleContent';
import axios from 'axios';

// Типы для статьи
interface Article {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  authorAvatar?: string;
  category?: string;
  categorySlug?: string;
  tags?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  publishDate?: string;
  readTime?: number;
  isPublished?: boolean;
}

// Типы для навигации между статьями
interface ArticleNavigation {
  previous: {
    id: number;
    title: string;
  } | null;
  next: {
    id: number;
    title: string;
  } | null;
}

// Градиенты для статей
const gradients = [
  'from-blue-500 to-purple-500',
  'from-green-400 to-blue-500',
  'from-purple-500 to-pink-500',
  'from-yellow-400 to-orange-500',
  'from-pink-500 to-red-500',
  'from-indigo-500 to-blue-500',
  'from-red-500 to-yellow-500',
  'from-teal-400 to-blue-500',
  'from-orange-500 to-red-500',
  'from-blue-400 to-emerald-500',
];

// Функция для получения градиента по id
const getGradientById = (id: string): string => {
  const numId = parseInt(id, 10);
  return gradients[(numId - 1) % gradients.length];
};

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [navigation, setNavigation] = useState<ArticleNavigation>({ previous: null, next: null });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Загрузка статьи с API
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data.article);
        setNavigation(response.data.navigation);
        setError(null);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article. Please try again later.');
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Навигация к предыдущей статье
  const goToPrevArticle = () => {
    if (navigation.previous) {
      navigate(`/articles/${navigation.previous.id}`);
    }
  };
  
  // Навигация к следующей статье
  const goToNextArticle = () => {
    if (navigation.next) {
      navigate(`/articles/${navigation.next.id}`);
    }
  };
  
  // Переключение состояния "сохранено"
  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };
  
  // Показать/скрыть опции шаринга
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  // Если идет загрузка
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }
  
  // Если произошла ошибка
  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-2xl font-bold mb-4">Loading Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/articles" className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to articles list
          </Link>
        </div>
      </div>
    );
  }
  
  // Если статья не найдена
  if (!article) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <p className="text-gray-600 mb-6">The requested article does not exist or has been removed.</p>
          <Link to="/articles" className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to articles list
          </Link>
        </div>
      </div>
    );
  }

  // Получаем градиент для статьи
  const gradient = getGradientById(id || '1');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Хлебные крошки и навигация */}
      <div className="container-custom py-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/articles" className="text-gray-500 hover:text-gray-700">Articles</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{article.title.substring(0, 30)}...</span>
          </div>
          
          <div className="flex space-x-2">
            {navigation.previous && (
              <button 
                onClick={goToPrevArticle}
                className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                aria-label="Previous article"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
            )}
            
            {navigation.next && (
              <button 
                onClick={goToNextArticle}
                className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                aria-label="Next article"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="container-custom py-6">
        {/* Основной контент */}
        <div className="grid grid-cols-1 gap-8">
          {/* Статья с заголовком и содержимым */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            {/* Заголовок с градиентной полосой */}
            <div className="relative">
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradient}`}></div>
              <div className="p-8 md:p-12 pb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins',_sans-serif] text-gray-900 leading-tight">{article.title}</h1>
                
                {article.excerpt && (
                  <p className="text-gray-600 text-lg mb-4 max-w-3xl leading-relaxed">
                    {article.excerpt}
                  </p>
                )}
                
                {/* Категория и теги */}
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  {article.category && (
                    <div className="flex items-center">
                      <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                  )}
                  
                  {/* Теги */}
                  {article.tags && article.tags.length > 0 && (
                    <>
                      {article.tags.map((tag) => (
                        <Link key={tag.id} to={`/articles?tag=${tag.slug}`} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag.name}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Разделитель */}
            <div className="h-px bg-gray-100 mx-8 md:mx-12"></div>
            
            {/* Содержимое статьи */}
            <div className="p-8 md:p-12 prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
              <ArticleContent content={article.content} />
            </div>
            
            {/* Навигационные кнопки для мобильных устройств */}
            <div className="flex justify-center gap-3 mt-12 pt-6 border-t border-gray-200 lg:hidden">
              {navigation.previous && (
                <button 
                  onClick={goToPrevArticle}
                  className="flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span>Previous article</span>
                </button>
              )}
              
              {navigation.next && (
                <button 
                  onClick={goToNextArticle}
                  className="flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <span>Next article</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>
          </div>
          
          {/* Навигация между статьями (для более широких экранов) */}
          <div className="hidden lg:grid grid-cols-2 gap-6 mb-8">
            {navigation.previous ? (
              <Link 
                to={`/articles/${navigation.previous.id}`} 
                className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>
                <ChevronLeft className="h-6 w-6 text-blue-500 group-hover:text-blue-600 mr-4 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 mb-1">Previous article</div>
                  <div className="text-base font-medium text-gray-900 group-hover:text-blue-600 line-clamp-1">
                    {navigation.previous.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div></div> // Пустой div для сохранения выравнивания
            )}
            
            {navigation.next ? (
              <Link 
                to={`/articles/${navigation.next.id}`} 
                className="flex items-center justify-end p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-right group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Next article</div>
                  <div className="text-base font-medium text-gray-900 group-hover:text-blue-600 line-clamp-1">
                    {navigation.next.title}
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-blue-500 group-hover:text-blue-600 ml-4 flex-shrink-0" />
              </Link>
            ) : (
              <div></div> // Пустой div для сохранения выравнивания
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
