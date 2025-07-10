import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Music, 
  BookOpen, 
  GraduationCap, 
  Gamepad2, 
  Search, 
  Bell, 
  User,
  Menu,
  X
} from 'lucide-react';

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { name: 'Video Shorts', path: '/video', icon: <Video className="h-5 w-5" /> },
  { name: 'Music', path: '/music', icon: <Music className="h-5 w-5" /> },
  { name: 'Articles', path: '/articles', icon: <BookOpen className="h-5 w-5" /> },
  { name: 'Courses', path: '/courses', icon: <GraduationCap className="h-5 w-5" /> },
  { name: 'Games', path: '/games', icon: <Gamepad2 className="h-5 w-5" /> },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Articles');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 font-['Poppins',_sans-serif]">ContentHub</span>
            </Link>
          </div>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeItem === item.name
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Правая часть */}
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100">
              <User className="h-5 w-5" />
            </Link>

            {/* Мобильное меню */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Мобильная навигация */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                  activeItem === item.name
                    ? 'bg-gray-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => {
                  setActiveItem(item.name);
                  setIsMenuOpen(false);
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Ссылка на профиль в мобильном меню */}
            <Link
              to="/profile"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Профиль</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;