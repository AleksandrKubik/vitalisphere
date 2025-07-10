import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import axios from 'axios';

// Types for courses
interface Course {
  id: number;
  title: string;
  description: string;
}

// Gradients for course cards
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

const SimplifiedCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Loading courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/simplified-courses');
        setCourses(response.data.courses);
        setError(null);
      } catch (err) {
        console.error('Error loading courses:', err);
        setError('Failed to load courses. Please try again later.');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Function to get gradient by index
  const getGradient = (index: number) => {
    return gradients[index % gradients.length];
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-['Poppins',_sans-serif] mb-2">Courses</h1>
            <p className="text-gray-600">
              Develop skills and gain new knowledge with our interactive courses
            </p>
          </div>
        </div>
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
          <h3 className="text-xl font-semibold mb-2 text-red-700">{error}</h3>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Course list */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Link 
              key={course.id} 
              to={`/simplified-courses/${course.id}`} 
              className="group"
            >
              <div className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col bg-gradient-to-br ${getGradient(index)}`}>
                <div className="p-6 flex flex-col flex-grow text-white">
                  <h2 className="text-xl font-bold mb-3 group-hover:underline">
                    {course.title}
                  </h2>
                  
                  <p className="text-white/90 flex-grow mb-4">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto flex justify-end">
                    <span className="inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white">
                      Start Learning
                      <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* If no results */}
      {!loading && !error && courses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <GraduationCap className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Courses Found</h3>
          <p className="text-gray-500">
            Courses are currently unavailable. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default SimplifiedCoursesPage;
