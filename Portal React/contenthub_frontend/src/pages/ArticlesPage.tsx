import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, Search, X } from 'lucide-react';
import axios from 'axios';

// Types for articles
interface Article {
  id: number;
  title: string;
  excerpt: string;
  author?: string;
  authorAvatar?: string;
  category?: string;
  tags?: string[];
  publishDate?: string;
  readTime?: number;
}

// Types for pagination
interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number | null;
  to: number | null;
}

// Gradients for article cards
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

const ArticlesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');

  // Get parameters from URL
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const page = searchParams.get('page') || '1';

  // Loading articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // Create URL with parameters
        let url = '/api/articles?';
        const params = new URLSearchParams();
        
        if (category) params.append('category', category);
        if (tag) params.append('tag', tag);
        if (search) params.append('search', search);
        params.append('page', page);
        params.append('per_page', '9'); // Fixed number of articles per page
        
        const response = await axios.get(`${url}${params.toString()}`);
        setArticles(response.data.articles);
        setPagination(response.data.pagination);
        setError(null);
      } catch (err) {
        console.error('Error loading articles:', err);
        setError('Failed to load articles. Please try again later.');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, tag, search, page]);

  // Function to get random gradient
  const getRandomGradient = (index: number) => {
    return gradients[index % gradients.length];
  };

  // Search form submit handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    
    if (searchTerm) {
      newParams.set('search', searchTerm);
    } else {
      newParams.delete('search');
    }
    
    // Reset to first page on new search
    newParams.set('page', '1');
    
    setSearchParams(newParams);
  };

  // Search clear handler
  const clearSearch = () => {
    setSearchTerm('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  // Page change handler
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load more handler (for "Load more" button)
  const loadMore = () => {
    if (pagination && pagination.current_page < pagination.last_page) {
      handlePageChange(pagination.current_page + 1);
    }
  };

  return (
    <div>
      {/* Title and search */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-['Poppins',_sans-serif] mb-2">Articles</h1>
            <p className="text-gray-600">
              Interesting materials to expand your horizons and gain new knowledge
            </p>
          </div>
          
          {/* Search form */}
          <div className="mt-4 md:mt-0">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-10 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-3 top-2 text-blue-500 hover:text-blue-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        {/* Active filters display */}
        {(category || tag || search) && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">Filters:</span>
            
            {category && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Category: {category}
                <button
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('category');
                    setSearchParams(newParams);
                  }}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {tag && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Tag: {tag}
                <button
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('tag');
                    setSearchParams(newParams);
                  }}
                  className="ml-1 text-green-500 hover:text-green-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {search && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Search: {search}
                <button
                  onClick={clearSearch}
                  className="ml-1 text-purple-500 hover:text-purple-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            <button
              onClick={() => {
                setSearchParams({});
                setSearchTerm('');
              }}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Reset all
            </button>
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <svg className="h-16 w-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-red-700">{error}</h3>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Articles list */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles && articles.length > 0 && articles.map((article, index) => (
              <Link 
                key={article.id} 
                to={`/articles/${article.id}`} 
                className="group"
              >
                <div className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col bg-gradient-to-br ${getRandomGradient(index)}`}>
                  <div className="p-6 flex flex-col flex-grow text-white">
                    <h2 className="text-xl font-bold mb-3 group-hover:underline">
                      {article.title}
                    </h2>
                    
                    <p className="text-white/90 flex-grow mb-4">
                      {article.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      {/* Article metadata */}
                      <div className="flex items-center justify-end mb-3">
                        <span className="text-xs text-white/80">
                          {article.readTime || 5} min read
                        </span>
                      </div>
                      
                      <div className="flex justify-end">
                        <span className="inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white">
                          Read Article
                          <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* If no results */}
          {articles.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
              <p className="text-gray-500">
                No articles found for your query. Try changing your search parameters.
              </p>
            </div>
          )}
          
          {/* Load More Button */}
          {pagination && pagination.last_page > 1 && (
            <div className="mt-10 text-center">
              {pagination.current_page < pagination.last_page && (
                <button 
                  onClick={loadMore}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ArticlesPage;
