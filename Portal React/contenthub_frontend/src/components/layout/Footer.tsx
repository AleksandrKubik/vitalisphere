import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Heart 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ContentHub</h3>
            <p className="text-gray-300 mb-4">
              Ваш универсальный портал для видео, музыки, статей, курсов и игр.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Разделы</h4>
            <ul className="space-y-2">
              <li><Link to="/video" className="text-gray-300 hover:text-white transition-colors">Video Shorts</Link></li>
              <li><Link to="/music" className="text-gray-300 hover:text-white transition-colors">Music</Link></li>
              <li><Link to="/articles" className="text-gray-300 hover:text-white transition-colors">Articles</Link></li>
              <li><Link to="/courses" className="text-gray-300 hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/games" className="text-gray-300 hover:text-white transition-colors">Games</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Подписка</h4>
            <ul className="space-y-2">
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Тарифы</Link></li>
              <li><Link to="/subscription" className="text-gray-300 hover:text-white transition-colors">Отменить подписку</Link></li>
              <li><Link to="/gift" className="text-gray-300 hover:text-white transition-colors">Подарочные карты</Link></li>
              <li><Link to="/referral" className="text-gray-300 hover:text-white transition-colors">Пригласи друга</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Помощь</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Контакты</Link></li>
              <li>
                <a href="mailto:support@contenthub.com" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Mail size={16} />
                  <span>support@contenthub.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ContentHub. Все права защищены.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Условия использования
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
              <Link to="/subscription-terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Условия подписки
              </Link>
              <Link to="/refund" className="text-gray-400 hover:text-white text-sm transition-colors">
                Возврат средств
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-400 text-sm flex items-center justify-center">
            <span>Сделано с</span>
            <Heart size={16} className="mx-1 text-danger" />
            <span>командой DSM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
