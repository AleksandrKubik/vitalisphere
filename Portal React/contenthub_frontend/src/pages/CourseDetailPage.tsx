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

// Типы для курса
interface CourseArticle {
  id: number;
  title: string;
  readTime: string;
  isCompleted?: boolean;
}

interface CourseModule {
  id: number;
  title: string;
  articles: CourseArticle[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  instructor: string;
  modules: CourseModule[];
  requirements: string[];
  whatYouWillLearn: string[];
}

// Градиенты для курсов
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

// Функция для получения градиента по id
const getGradientById = (id: string): string => {
  const numId = parseInt(id, 10);
  return gradients[(numId - 1) % gradients.length];
};

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Пример курса с модулями и статьями
  const courses: Record<string, Course> = {
    '1': {
      id: 1,
      title: 'Основы React разработки',
      description: 'Изучите основы React и создайте свое первое приложение с нуля. Курс для начинающих разработчиков.',
      fullDescription: `
        <p>React — одна из самых популярных JavaScript-библиотек для создания пользовательских интерфейсов. Разработанная и поддерживаемая Facebook, она используется многими крупными компаниями и стартапами по всему миру.</p>
        
        <p>В этом курсе вы изучите основы React, начиная с базовых концепций и заканчивая созданием полноценного приложения. Вы узнаете, как работать с компонентами, состояниями, пропсами, хуками и многим другим.</p>
        
        <p>Курс построен на практических примерах, которые помогут вам закрепить полученные знания и применить их в реальных проектах. К концу курса вы сможете самостоятельно создавать современные и отзывчивые веб-приложения с использованием React.</p>
      `,
      instructor: 'Кент С. Доддс',
      modules: [
        {
          id: 1,
          title: 'Введение в React',
          articles: [
            { id: 1, title: 'Что такое React и зачем он нужен', readTime: '10 мин', isCompleted: true },
            { id: 2, title: 'Настройка окружения разработки', readTime: '15 мин' },
            { id: 3, title: 'Создание первого React-приложения', readTime: '20 мин' }
          ]
        },
        {
          id: 2,
          title: 'Компоненты и пропсы',
          articles: [
            { id: 4, title: 'Функциональные и классовые компоненты', readTime: '15 мин' },
            { id: 5, title: 'Передача данных через пропсы', readTime: '12 мин' },
            { id: 6, title: 'Композиция компонентов', readTime: '18 мин' }
          ]
        },
        {
          id: 3,
          title: 'Состояние и жизненный цикл',
          articles: [
            { id: 7, title: 'Управление состоянием в функциональных компонентах', readTime: '15 мин' },
            { id: 8, title: 'Хук useState', readTime: '12 мин' },
            { id: 9, title: 'Хук useEffect', readTime: '18 мин' }
          ]
        }
      ],
      requirements: [
        'Базовые знания HTML, CSS и JavaScript',
        'Понимание основ ES6 (стрелочные функции, деструктуризация, модули)',
        'Установленный Node.js и npm',
        'Любой текстовый редактор или IDE (рекомендуется VS Code)'
      ],
      whatYouWillLearn: [
        'Основы React и его экосистемы',
        'Создание и управление компонентами',
        'Работа с хуками и состоянием',
        'Обработка форм и событий',
        'Маршрутизация в React-приложениях',
        'Лучшие практики и паттерны React-разработки',
        'Создание полноценного приложения с нуля'
      ]
    },
    '2': {
      id: 2,
      title: 'UI/UX дизайн: от новичка до профессионала',
      description: 'Полное руководство по созданию привлекательных и удобных интерфейсов. Практические проекты и обратная связь от экспертов.',
      fullDescription: `
        <p>UI/UX дизайн — это искусство создания интерфейсов, которые не только красивы, но и удобны в использовании. В этом курсе вы изучите все аспекты дизайна пользовательских интерфейсов, от базовых принципов до продвинутых техник.</p>
        
        <p>Курс охватывает весь процесс дизайна: от исследования пользователей и создания прототипов до финальной реализации и тестирования. Вы научитесь работать с современными инструментами, такими как Figma, и освоите принципы дизайн-мышления.</p>
        
        <p>Особое внимание в курсе уделяется практике. Вы будете работать над реальными проектами, получать обратную связь от экспертов и формировать портфолио, которое поможет вам начать карьеру в UI/UX дизайне.</p>
      `,
      instructor: 'Сара Парментер',
      modules: [
        {
          id: 1,
          title: 'Основы UI/UX дизайна',
          articles: [
            { id: 1, title: 'Введение в UI/UX дизайн', readTime: '10 мин', isCompleted: true },
            { id: 2, title: 'Принципы пользовательского опыта', readTime: '15 мин' },
            { id: 3, title: 'Элементы пользовательского интерфейса', readTime: '12 мин' }
          ]
        },
        {
          id: 2,
          title: 'Исследование пользователей',
          articles: [
            { id: 4, title: 'Методы исследования пользователей', readTime: '15 мин' },
            { id: 5, title: 'Создание персон', readTime: '12 мин' },
            { id: 6, title: 'Пользовательские сценарии и истории', readTime: '18 мин' }
          ]
        }
      ],
      requirements: [
        'Базовые знания графического дизайна',
        'Компьютер с установленной Figma',
        'Интерес к психологии пользователей и дизайну интерфейсов'
      ],
      whatYouWillLearn: [
        'Принципы UI/UX дизайна',
        'Исследование пользователей и создание персон',
        'Прототипирование и тестирование',
        'Работа с Figma',
        'Создание дизайн-систем',
        'Адаптивный и отзывчивый дизайн',
        'Анимации и микровзаимодействия'
      ]
    }
  };
  
  // Получаем данные курса по id
  const course = courses[id || '1'];
  
  // Если курс не найден
  if (!course) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Курс не найден</h1>
          <p className="text-gray-600 mb-6">Запрашиваемый курс не существует или был удален.</p>
          <Link to="/courses" className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к списку курсов
          </Link>
        </div>
      </div>
    );
  }

  // Получаем градиент для курса
  const gradient = getGradientById(id || '1');
  
  // Подсчет общего количества статей
  const totalArticles = course.modules.reduce((total, module) => total + module.articles.length, 0);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="container-custom py-12">
        {/* Навигация назад */}
        <div className="mb-8">
          <Link to="/courses" className="text-blue-600 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к списку курсов
          </Link>
        </div>
        
        {/* Заголовок курса с градиентным фоном */}
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
                  to={`/courses/${course.id}/modules/1/articles/1`}
                  className="w-full bg-white text-blue-600 hover:bg-white/90 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Начать обучение
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Основное содержимое */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка */}
          <div className="lg:col-span-2">
            {/* О курсе */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">О курсе</h2>
              <div 
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700"
                dangerouslySetInnerHTML={{ __html: course.fullDescription }}
              />
            </div>
            
            {/* Чему вы научитесь */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Чему вы научитесь</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Требования */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Требования</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {course.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Правая колонка */}
          <div>
            {/* Содержание курса */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Содержание курса</h2>
              <div className="text-sm text-gray-600 mb-4">
                {course.modules.length} модулей • {totalArticles} статей
              </div>
              
              <div className="space-y-4">
                {course.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 font-medium">
                      <span className="text-gray-800">{moduleIndex + 1}. {module.title}</span>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {module.articles.map((article, articleIndex) => (
                        <Link 
                          key={article.id}
                          to={`/courses/${course.id}/modules/${moduleIndex + 1}/articles/${articleIndex + 1}`}
                          className="block p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              {article.isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-gray-300 mr-3 flex-shrink-0"></div>
                              )}
                              <span className="text-gray-700">
                                {moduleIndex + 1}.{articleIndex + 1} {article.title}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500">{article.readTime}</span>
                            </div>
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

export default CourseDetailPage;