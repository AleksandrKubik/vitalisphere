import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  ChevronLeft,
  ChevronRight,
  List,
  Home,
  Menu,
  X
} from 'lucide-react';
import axios from 'axios';

// Types for course and article
interface CourseArticle {
  title: string;
  content: string;
  read_time: string;
  order_index: number;
  is_completed?: boolean;
}

interface CourseModule {
  title: string;
  order_index: number;
  articles: CourseArticle[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  modules: CourseModule[];
}

// Gradients for courses
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

// Function to get gradient by id
const getGradientById = (id: string): string => {
  const numId = parseInt(id, 10);
  return gradients[(numId - 1) % gradients.length];
};

const SimplifiedCourseArticlePage = () => {
  const { courseId, moduleIndex, articleIndex } = useParams<{ courseId: string; moduleIndex: string; articleIndex: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Convert indices to numbers
  const moduleIdxNum = parseInt(moduleIndex || '0', 10);
  const articleIdxNum = parseInt(articleIndex || '0', 10);
  
  // Get gradient for course
  const gradient = getGradientById(courseId || '1');
  
  // Close sidebar when window is resized to large screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loading course data
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/simplified-courses/${courseId}`);
        setCourse(response.data.course);
        setError(null);
      } catch (err) {
        console.error('Error loading course:', err);
        setError('Failed to load course. Please try again later.');
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);
  
  // Calculate sorted modules and articles
  const sortedModules = useMemo(() => {
    if (!course) return [];
    return [...course.modules].sort((a, b) => a.order_index - b.order_index);
  }, [course]);
  
  // Find module by index
  const module = useMemo(() => {
    if (!sortedModules.length) return null;
    return sortedModules[moduleIdxNum] || null;
  }, [sortedModules, moduleIdxNum]);
  
  // Sort articles by order_index
  const sortedArticles = useMemo(() => {
    if (!module) return [];
    return [...module.articles].sort((a, b) => a.order_index - b.order_index);
  }, [module]);
  
  // Find article by index
  const article = useMemo(() => {
    if (!sortedArticles.length) return null;
    return sortedArticles[articleIdxNum] || null;
  }, [sortedArticles, articleIdxNum]);
  
  // Create array of all articles for navigation
  const allArticles = useMemo(() => {
    const articles: { moduleIdx: number; articleIdx: number; title: string }[] = [];
    if (!sortedModules.length) return articles;
    
    sortedModules.forEach((m, mIdx) => {
      m.articles.sort((a, b) => a.order_index - b.order_index).forEach((a, aIdx) => {
        articles.push({
          moduleIdx: mIdx,
          articleIdx: aIdx,
          title: a.title
        });
      });
    });
    return articles;
  }, [sortedModules]);
  
  // Find current article index in the overall array
  const currentArticleIndex = useMemo(() => {
    return allArticles.findIndex(
      a => a.moduleIdx === moduleIdxNum && a.articleIdx === articleIdxNum
    );
  }, [allArticles, moduleIdxNum, articleIdxNum]);
  
  // Determine previous and next articles
  const prevArticle = useMemo(() => {
    if (currentArticleIndex <= 0) return null;
    return allArticles[currentArticleIndex - 1];
  }, [allArticles, currentArticleIndex]);
    
  const nextArticle = useMemo(() => {
    if (currentArticleIndex < 0 || currentArticleIndex >= allArticles.length - 1) return null;
    return allArticles[currentArticleIndex + 1];
  }, [allArticles, currentArticleIndex]);

  // Keyboard event handler for navigation
  useEffect(() => {
    // Always create handler, but its logic can be conditional
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for data availability inside the handler
      if (!course) return;
      
      if (e.key === 'ArrowLeft' && prevArticle) {
        navigate(`/simplified-courses/${courseId}/modules/${prevArticle.moduleIdx}/articles/${prevArticle.articleIdx}`);
      } else if (e.key === 'ArrowRight' && nextArticle) {
        navigate(`/simplified-courses/${courseId}/modules/${nextArticle.moduleIdx}/articles/${nextArticle.articleIdx}`);
      } else if (e.key === 'Escape') {
        navigate(`/simplified-courses/${courseId}`);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [courseId, navigate, nextArticle, prevArticle, course]);

  // Loading indicator
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Error message
  if (error || !course) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested course does not exist or has been removed.'}</p>
          <Link to="/simplified-courses" className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Courses List
          </Link>
        </div>
      </div>
    );
  }
  
  // Check if module exists
  if (!module) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <p className="text-gray-600 mb-6">The requested module does not exist or has been removed.</p>
          <Link to={`/simplified-courses/${courseId}`} className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Course
          </Link>
        </div>
      </div>
    );
  }
  
  // Check if article exists
  if (!article) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The requested article does not exist or has been removed.</p>
          <Link to={`/simplified-courses/${courseId}`} className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Mobile navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <h2 className="text-lg font-semibold truncate">{article.title}</h2>
        </div>
        <Link to="/" className="p-2 rounded-full hover:bg-gray-100">
          <Home className="h-6 w-6" />
        </Link>
      </div>
      
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
          <div 
            className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-white p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Course Content</h2>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <Link to={`/simplified-courses/${courseId}`} className="flex items-center text-blue-600 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Course</span>
            </Link>
            
            <div className="space-y-4">
              {sortedModules.map((m, mIndex) => (
                <div key={mIndex} className={`${mIndex === moduleIdxNum ? 'border-blue-500' : 'border-gray-200'} border rounded-lg overflow-hidden`}>
                  <div className={`${mIndex === moduleIdxNum ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-800'} p-3 font-medium`}>
                    {mIndex + 1}. {m.title}
                  </div>
                  <div className="divide-y divide-gray-200">
                    {m.articles.sort((a, b) => a.order_index - b.order_index).map((a, aIndex) => (
                      <Link 
                        key={aIndex}
                        to={`/simplified-courses/${courseId}/modules/${mIndex}/articles/${aIndex}`}
                        className={`block p-3 hover:bg-gray-50 transition-colors ${aIndex === articleIdxNum && mIndex === moduleIdxNum ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <div className="flex items-center">
                          {a.is_completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          ) : aIndex === articleIdxNum && mIndex === moduleIdxNum ? (
                            <div className="w-4 h-4 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-300 mr-3 flex-shrink-0"></div>
                          )}
                          <span>{mIndex + 1}.{aIndex + 1} {a.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="container-custom py-12 pt-24 lg:pt-12">
        {/* Top navigation - desktop only */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <Link to={`/simplified-courses/${courseId}`} className="text-blue-600 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Course</span>
          </Link>
          <Link to="/" className="text-blue-600 hover:underline flex items-center">
            <Home className="h-4 w-4 mr-2" />
            <span>Home</span>
          </Link>
        </div>
        
        {/* Course title with gradient background */}
        <div className={`bg-gradient-to-r ${gradient} rounded-xl shadow-lg p-6 mb-8 text-white`}>
          <h1 className="text-2xl font-bold mb-2 font-['Poppins',_sans-serif]">{course.title}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with course content - desktop only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Course Content</h2>
                <Link to={`/simplified-courses/${courseId}`} className="text-blue-600 hover:text-blue-800">
                  <List className="h-5 w-5" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {sortedModules.map((m, mIndex) => (
                  <div key={mIndex} className={`${mIndex === moduleIdxNum ? 'border-blue-500' : 'border-gray-200'} border rounded-lg overflow-hidden`}>
                    <div className={`${mIndex === moduleIdxNum ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-800'} p-3 font-medium`}>
                      {mIndex + 1}. {m.title}
                    </div>
                    {mIndex === moduleIdxNum && (
                      <div className="divide-y divide-gray-200">
                        {m.articles.sort((a, b) => a.order_index - b.order_index).map((a, aIndex) => (
                          <Link 
                            key={aIndex}
                            to={`/simplified-courses/${courseId}/modules/${moduleIdxNum}/articles/${aIndex}`}
                            className={`block p-3 hover:bg-gray-50 transition-colors ${aIndex === articleIdxNum ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                          >
                            <div className="flex items-center">
                              {a.is_completed ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                              ) : aIndex === articleIdxNum ? (
                                <div className="w-4 h-4 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-gray-300 mr-3 flex-shrink-0"></div>
                              )}
                              <span>{mIndex + 1}.{aIndex + 1} {a.title}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main article content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 mb-6">
              <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-bold">{article.title}</h2>
              </div>
              
              <div 
                className="prose prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
            
            {/* Article navigation */}
            <div className="flex justify-between items-center bg-white rounded-xl shadow-lg p-4">
              {prevArticle ? (
                <Link 
                  to={`/simplified-courses/${courseId}/modules/${prevArticle.moduleIdx}/articles/${prevArticle.articleIdx}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 group bg-blue-50 hover:bg-blue-100 rounded-lg p-3 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-sm text-blue-400">Previous Article</div>
                    <div className="font-medium">
                      {prevArticle.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div></div>
              )}
              
              {nextArticle ? (
                <Link 
                  to={`/simplified-courses/${courseId}/modules/${nextArticle.moduleIdx}/articles/${nextArticle.articleIdx}`}
                  className="flex items-center text-right text-blue-600 hover:text-blue-800 group bg-blue-50 hover:bg-blue-100 rounded-lg p-3 transition-colors"
                >
                  <div>
                    <div className="text-sm text-blue-400">Next Article</div>
                    <div className="font-medium">
                      {nextArticle.title}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link 
                  to={`/simplified-courses/${courseId}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 group bg-green-50 hover:bg-green-100 rounded-lg p-3 transition-colors"
                >
                  <div>
                    <div className="text-sm text-green-500">Congratulations!</div>
                    <div className="font-medium">Complete Course</div>
                  </div>
                  <CheckCircle className="h-5 w-5 ml-2 text-green-500 group-hover:scale-110 transition-transform" />
                </Link>
              )}
            </div>
            
            {/* Navigation tips */}
            <div className="mt-4 text-center text-gray-500 text-sm">
              <p>Use ← and → keys to navigate between articles, Esc to return to course</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedCourseArticlePage;
