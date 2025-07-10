import { Link } from 'react-router-dom';
import { 
  Video, 
  Music, 
  BookOpen, 
  GraduationCap, 
  Gamepad2
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero секция */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Poppins',_sans-serif]">
              Добро пожаловать в ContentHub
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Видео, музыка, статьи, курсы и игры — всё, что вам нужно для развлечения и развития.
            </p>
            <div className="flex justify-center">
              <Link to="/video" className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors bg-white text-blue-600 hover:bg-white/90">
                Начать просмотр
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Секция категорий */}
      <section className="py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center font-['Poppins',_sans-serif]">Выберите категорию</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link to="/video" className="bg-white rounded-lg shadow-md overflow-hidden p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Video className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Shorts</h3>
              <p className="text-gray-600">Короткие видеоролики на любой вкус</p>
            </Link>
            
            <Link to="/music" className="bg-white rounded-lg shadow-md overflow-hidden p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                <Music className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Music</h3>
              <p className="text-gray-600">Бесконечный плеер с популярными треками</p>
            </Link>
            
            <Link to="/articles" className="bg-white rounded-lg shadow-md overflow-hidden p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Articles</h3>
              <p className="text-gray-600">Интересные статьи для расширения кругозора</p>
            </Link>
            
            <Link to="/courses" className="bg-white rounded-lg shadow-md overflow-hidden p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                <GraduationCap className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Courses</h3>
              <p className="text-gray-600">Курсы для новичков и профессионалов</p>
            </Link>
            
            <Link to="/games" className="bg-white rounded-lg shadow-md overflow-hidden p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <Gamepad2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Games</h3>
              <p className="text-gray-600">HTML5-игры для быстрого развлечения</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
