import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  GraduationCap, 
  Clock, 
  BookOpen, 
  Play, 
  CheckCircle, 
  FileText
} from 'lucide-react';
import axios from 'axios';

// Types for course
interface CourseArticle {
  title: string;
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
  full_description: string;
  modules: CourseModule[];
  requirements: string[];
  learning_outcomes: string[];
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

const SimplifiedCourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Loading course data
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/simplified-courses/${id}`);
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

    if (id) {
      fetchCourse();
    }
  }, [id]);
  
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

  // Get gradient for course
  const gradient = getGradientById(id || '1');
  
  // Count total number of articles
  const totalArticles = course.modules.reduce((total, module) => total + module.articles.length, 0);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="container-custom py-12">
        {/* Back navigation */}
        <div className="mb-8">
          <Link to="/simplified-courses" className="text-blue-600 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses List
          </Link>
        </div>
        
        {/* Course title with gradient background */}
        <div className={`bg-gradient-to-r ${gradient} rounded-xl shadow-lg p-8 mb-8 text-white`}>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-2/3">              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins',_sans-serif]">{course.title}</h1>
              
              <p className="text-white/90 text-lg mb-6">
                {course.description}
              </p>
            </div>
            
            <div className="md:w-1/3 mt-6 md:mt-0 md:flex md:justify-end md:items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <Link 
                  to={`/simplified-courses/${course.id}/modules/0/articles/0`}
                  className="w-full bg-white text-blue-600 hover:bg-white/90 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2">
            {/* About the course */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">About the Course</h2>
              <div 
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700"
                dangerouslySetInnerHTML={{ __html: course.full_description }}
              />
            </div>
            
            {/* What you'll learn */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.learning_outcomes.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {course.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right column */}
          <div>
            {/* Course content */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Course Content</h2>
              <div className="text-sm text-gray-600 mb-4">
                {course.modules.length} modules • {totalArticles} articles
              </div>
              
              <div className="space-y-4">
                {course.modules.sort((a, b) => a.order_index - b.order_index).map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 font-medium">
                      <span className="text-gray-800">{moduleIndex + 1}. {module.title}</span>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {module.articles.sort((a, b) => a.order_index - b.order_index).map((article, articleIndex) => (
                        <Link 
                          key={articleIndex}
                          to={`/simplified-courses/${course.id}/modules/${moduleIndex}/articles/${articleIndex}`}
                          className="block p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            {article.is_completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-gray-300 mr-3 flex-shrink-0"></div>
                            )}
                            <span className="text-gray-700">
                              {moduleIndex + 1}.{articleIndex + 1} {article.title}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedCourseDetailPage;
