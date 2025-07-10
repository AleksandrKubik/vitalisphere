import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

// Типы для курсов (упрощенная версия)
interface Course {
  id: number;
  title: string;
  description: string;
}

// Градиенты для карточек курсов
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

const CoursesPage = () => {
  // Примеры курсов (упрощенная структура - только id, title и description)
  const courses: Course[] = [
    {
      id: 1,
      title: 'Основы React разработки',
      description: 'Изучите основы React и создайте свое первое приложение с нуля. Курс для начинающих разработчиков.'
    },
    {
      id: 2,
      title: 'UI/UX дизайн: от новичка до профессионала',
      description: 'Полное руководство по созданию привлекательных и удобных интерфейсов. Практические проекты и обратная связь от экспертов.'
    },
    {
      id: 3,
      title: 'Стартап с нуля: от идеи до первых клиентов',
      description: 'Практический курс по запуску стартапа. Валидация идеи, создание MVP, привлечение первых пользователей.'
    },
    {
      id: 4,
      title: 'Продвинутые алгоритмы и структуры данных',
      description: 'Углубленное изучение алгоритмов и структур данных для решения сложных задач программирования и подготовки к собеседованиям.'
    },
    {
      id: 5,
      title: 'Цифровой маркетинг 2025: актуальные стратегии',
      description: 'Современные подходы к цифровому маркетингу, включая SEO, SMM, email-маркетинг и контент-стратегии.'
    },
    {
      id: 6,
      title: 'Основы личной продуктивности',
      description: 'Научитесь эффективно управлять временем, ставить цели и достигать их, формировать полезные привычки.'
    },
    {
      id: 7,
      title: 'Машинное обучение для начинающих',
      description: 'Введение в мир машинного обучения. Основные алгоритмы, практические примеры и проекты для портфолио.'
    },
    {
      id: 8,
      title: 'Финансовая грамотность и инвестиции',
      description: 'Научитесь управлять личными финансами, создавать пассивный доход и инвестировать с минимальными рисками.'
    },
    {
      id: 9,
      title: 'Искусство публичных выступлений',
      description: 'Преодолейте страх сцены и научитесь выступать уверенно перед любой аудиторией. Практические техники и упражнения.'
    }
  ];

  // Функция для получения градиента по индексу
  const getGradient = (index: number) => {
    return gradients[index % gradients.length];
  };

  return (
    <div>
      {/* Заголовок */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-['Poppins',_sans-serif] mb-2">Курсы</h1>
            <p className="text-gray-600">
              Развивайте навыки и получайте новые знания с нашими интерактивными курсами
            </p>
          </div>
        </div>
      </div>

      {/* Список курсов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Link 
            key={course.id} 
            to={`/courses/${course.id}`} 
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
                    Начать обучение
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
      
      {/* Если нет результатов */}
      {courses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <GraduationCap className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Курсы не найдены</h3>
          <p className="text-gray-500">
            В данный момент курсы недоступны. Пожалуйста, проверьте позже.
          </p>
        </div>
      )}
      
      {/* Кнопка "Загрузить еще" */}
      {courses.length > 0 && (
        <div className="mt-10 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
            Загрузить еще
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;