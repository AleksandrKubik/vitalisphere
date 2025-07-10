import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Боковое меню - скрыто на мобильных устройствах */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Мобильное боковое меню */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileSidebar}></div>
          <div className="relative flex h-full w-80 flex-col bg-white">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Основной контент */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Кнопка мобильного меню - видна только на мобильных устройствах */}
        <div className="md:hidden p-4">
          <button
            className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100"
            onClick={toggleMobileSidebar}
          >
            {isMobileSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
