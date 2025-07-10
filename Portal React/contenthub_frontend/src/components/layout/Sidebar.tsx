import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Video, 
  Music, 
  BookOpen, 
  GraduationCap, 
  Gamepad2, 
  User,
  LogOut,
  LogIn
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const mainNavItems: NavItem[] = [
  { name: 'Video Shorts', path: '/video', icon: <Video className="h-5 w-5" /> },
  { name: 'Music', path: '/music', icon: <Music className="h-5 w-5" /> },
  { name: 'Articles', path: '/', icon: <BookOpen className="h-5 w-5" /> },
  { name: 'Courses', path: '/simplified-courses', icon: <GraduationCap className="h-5 w-5" /> },
  { name: 'Games', path: '/games', icon: <Gamepad2 className="h-5 w-5" /> },
];

// Only profile is left
const userNavItems: NavItem[] = [
  { name: 'Profile', path: '/profile', icon: <User className="h-5 w-5" /> }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/' && location.pathname === '/articles') return true;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <aside className={`bg-white shadow-md h-screen sticky top-0 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-100">
        <Link to="/" className="flex items-center justify-center md:justify-start">
          <span className={`text-2xl font-bold text-blue-600 font-['Poppins',_sans-serif] ${isCollapsed ? 'hidden' : 'block'}`}>ContentHub</span>
          <span className={`text-2xl font-bold text-blue-600 font-['Poppins',_sans-serif] ${isCollapsed ? 'block' : 'hidden'}`}>CH</span>
        </Link>
      </div>

      {/* Main navigation */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-3 rounded-md text-base font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <div className={isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}>
                {item.icon}
              </div>
              <span className={isCollapsed ? 'hidden' : 'block'}>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-100"></div>

        {/* User navigation */}
        <div className="space-y-1">
          {isAuthenticated && (
            <>
              {/* User info */}
              {!isCollapsed && user && (
                <div className="px-3 py-2 mb-2">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              )}
              
              {/* User navigation items */}
              {userNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <div className={isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}>
                    {item.icon}
                  </div>
                  <span className={isCollapsed ? 'hidden' : 'block'}>{item.name}</span>
                </Link>
              ))}
              
              {/* Logout button */}
              <button
                onClick={handleLogout}
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} w-full px-3 py-3 rounded-md text-base font-medium transition-colors text-red-600 hover:bg-red-50`}
              >
                <LogOut className="h-5 w-5" />
                <span className={isCollapsed ? 'hidden' : 'block'}>Logout</span>
              </button>
            </>
          )}
          
          {/* Login button (when not authenticated) */}
          {!isAuthenticated && (
            <button
              onClick={handleLogin}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} w-full px-3 py-3 rounded-md text-base font-medium transition-colors text-blue-600 hover:bg-blue-50`}
            >
              <LogIn className="h-5 w-5" />
              <span className={isCollapsed ? 'hidden' : 'block'}>Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Collapse/expand button */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full p-2 rounded-md text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          <span className={isCollapsed ? 'hidden' : 'ml-2'}>Collapse Menu</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
