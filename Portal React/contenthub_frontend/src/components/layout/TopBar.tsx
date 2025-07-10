import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  User,
  Menu,
  X
} from 'lucide-react';

interface TopBarProps {
  toggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

const TopBar = ({ toggleMobileSidebar, isMobileSidebarOpen }: TopBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика поиска
    console.log('Поиск:', searchQuery);
  };

  return (
    <div className="bg-white shadow-sm py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Кнопка мобильного меню */}
      <button
        className="md:hidden p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100"
        onClick={toggleMobileSidebar}
      >
        {isMobileSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Поиск */}
      <div className="flex-1 max-w-xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Поиск контента..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Правая часть */}
      <div className="flex items-center space-x-4 ml-4">
        {/* Уведомления */}
        <button className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* Профиль */}
        <Link to="/profile" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            А
          </div>
          <span className="hidden sm:inline-block text-sm font-medium text-gray-700">Александр</span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
