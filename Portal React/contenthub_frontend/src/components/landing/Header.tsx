import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Отслеживаем скролл для изменения стиля хедера
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white py-8'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Логотип */}
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="ContentHubMedia Logo" className="h-8 w-auto mr-2" />
            <span className="text-xl font-bold text-blue-600">
              ContentHubMedia
            </span>
          </Link>
          
          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/#video" 
              className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Videos
            </Link>
            <Link 
              to="/#music" 
              className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Music
            </Link>
            <Link 
              to="/#articles" 
              className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Articles
            </Link>
            <Link 
              to="/#courses" 
              className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Courses
            </Link>
            <Link 
              to="/#games" 
              className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Games
            </Link>
            
            <div className="relative group">
              <button 
                className="flex items-center font-medium text-gray-700 hover:text-blue-500 transition-colors"
              >
                More
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/#pricing" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Pricing
                </Link>
                <Link to="/subscription" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Subscription
                </Link>
                <Link to="/#faq" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  FAQ
                </Link>
              </div>
            </div>
          </nav>
          
          {/* Кнопки авторизации для десктопа */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
            >
              Start Free Trial
            </Link>
          </div>
          
          {/* Кнопка мобильного меню */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-4 px-4">
              <Link 
                to="/#video" 
                className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Videos
              </Link>
              <Link 
                to="/#music" 
                className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Music
              </Link>
              <Link 
                to="/#articles" 
                className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
              <Link 
                to="/#courses" 
                className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                to="/#games" 
                className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Games
              </Link>
              <Link 
                to="/#pricing" 
                className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/subscription" 
                className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Subscription
              </Link>
              <Link 
                to="/#faq" 
                className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              
              <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col space-y-4">
                <Link 
                  to="/login" 
                  className="font-medium text-gray-700 hover:text-blue-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Free Trial
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
