import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  ChevronLeft,
  ChevronRight,
  List,
  Home,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Типы для курса и статьи
interface CourseArticle {
  id: number;
  title: string;
  content: string;
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
  instructor: string;
  category: string;
  level: 'Начинающий' | 'Средний' | 'Продвинутый';
  modules: CourseModule[];
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

const CourseArticlePage = () => {
  const { courseId, moduleId, articleId } = useParams<{ courseId: string; moduleId: string; articleId: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Закрываем сайдбар при изменении размера окна на большой экран
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Пример курса с модулями и статьями
  const courses: Record<string, Course> = {
    '1': {
      id: 1,
      title: 'Основы React разработки',
      instructor: 'Кент С. Доддс',
      category: 'Программирование',
      level: 'Начинающий',
      modules: [
        {
          id: 1,
          title: 'Введение в React',
          articles: [
            {
              id: 1,
              title: 'Что такое React и зачем он нужен',
              readTime: '10 мин',
              isCompleted: true,
              content: `
                <h2>Что такое React?</h2>
                <p>React — это JavaScript-библиотека для создания пользовательских интерфейсов, разработанная и поддерживаемая Facebook (теперь Meta). Она позволяет разработчикам создавать сложные интерфейсы из изолированных кусочков кода, называемых "компонентами".</p>
                
                <p>React был впервые выпущен в 2013 году и с тех пор стал одной из самых популярных библиотек для разработки фронтенда. Его используют такие компании, как Netflix, Airbnb, Instagram, и, конечно же, сам Facebook.</p>
                
                <h2>Ключевые особенности React</h2>
                
                <h3>1. Компонентный подход</h3>
                <p>Основная идея React — разделение интерфейса на независимые, повторно используемые компоненты. Каждый компонент содержит свою логику и может быть использован многократно. Это делает код более организованным и легким для поддержки.</p>
                
                <h3>2. Виртуальный DOM</h3>
                <p>React использует концепцию виртуального DOM (Document Object Model), которая является облегченной копией реального DOM браузера. Когда данные в компоненте изменяются, React сначала обновляет виртуальный DOM, а затем эффективно обновляет только те части реального DOM, которые действительно изменились. Это значительно повышает производительность приложения.</p>
                
                <h3>3. Однонаправленный поток данных</h3>
                <p>В React данные передаются от родительских компонентов к дочерним через свойства (props). Это делает поток данных предсказуемым и облегчает отладку.</p>
                
                <h3>4. JSX</h3>
                <p>React использует JSX — расширение синтаксиса JavaScript, которое позволяет писать HTML-подобный код внутри JavaScript. Это делает код более читаемым и интуитивно понятным.</p>
                
                <h2>Зачем использовать React?</h2>
                
                <h3>1. Эффективность разработки</h3>
                <p>Компонентный подход React позволяет разработчикам создавать модульный, повторно используемый код. Это ускоряет процесс разработки и упрощает поддержку приложения.</p>
                
                <h3>2. Производительность</h3>
                <p>Благодаря виртуальному DOM, React обеспечивает высокую производительность даже для сложных интерфейсов с большим количеством динамических элементов.</p>
                
                <h3>3. Большое сообщество и экосистема</h3>
                <p>React имеет огромное сообщество разработчиков и богатую экосистему библиотек и инструментов. Это означает, что вы можете найти готовые решения для большинства задач и получить помощь, если столкнетесь с проблемами.</p>
                
                <h3>4. Поддержка мобильной разработки</h3>
                <p>React Native, основанный на тех же принципах, что и React, позволяет использовать ваши знания React для создания нативных мобильных приложений для iOS и Android.</p>
                
                <h3>5. Востребованность на рынке труда</h3>
                <p>Знание React является одним из самых востребованных навыков среди фронтенд-разработчиков. Многие компании используют React для своих проектов и активно ищут специалистов с опытом работы с этой библиотекой.</p>
                
                <h2>Заключение</h2>
                <p>React — это мощный инструмент для создания современных веб-приложений. Его компонентный подход, виртуальный DOM и однонаправленный поток данных делают разработку более эффективной и предсказуемой. Если вы хотите стать востребованным фронтенд-разработчиком, изучение React — отличное вложение времени и усилий.</p>
                
                <p>В следующих статьях мы рассмотрим, как настроить окружение для разработки с React и создать ваше первое приложение.</p>
              `
            },
            {
              id: 2,
              title: 'Настройка окружения разработки',
              readTime: '15 мин',
              content: `
                <h2>Настройка окружения для разработки React-приложений</h2>
                <p>Прежде чем начать создавать приложения с использованием React, необходимо настроить окружение разработки. В этой статье мы рассмотрим несколько способов настройки и выберем наиболее подходящий для начинающих.</p>
                
                <h2>Необходимые инструменты</h2>
                
                <h3>1. Node.js и npm</h3>
                <p>Node.js — это среда выполнения JavaScript на стороне сервера, которая позволяет запускать JavaScript-код вне браузера. npm (Node Package Manager) — это менеджер пакетов для Node.js, который позволяет устанавливать и управлять зависимостями проекта.</p>
                
                <p>Для установки Node.js и npm:</p>
                <ol>
                  <li>Перейдите на официальный сайт <a href="https://nodejs.org/" target="_blank">nodejs.org</a></li>
                  <li>Скачайте и установите LTS (Long Term Support) версию для вашей операционной системы</li>
                  <li>После установки проверьте версии, выполнив в терминале команды:
                    <pre><code>node -v
npm -v</code></pre>
                  </li>
                </ol>
                
                <h3>2. Редактор кода</h3>
                <p>Для разработки React-приложений вам понадобится хороший редактор кода. Наиболее популярные варианты:</p>
                <ul>
                  <li><strong>Visual Studio Code</strong> — бесплатный, мощный редактор с отличной поддержкой JavaScript и React</li>
                  <li><strong>WebStorm</strong> — платная IDE с богатым функционалом для веб-разработки</li>
                  <li><strong>Atom</strong> — бесплатный, настраиваемый редактор с поддержкой плагинов</li>
                  <li><strong>Sublime Text</strong> — легкий и быстрый редактор (условно-бесплатный)</li>
                </ul>
                
                <p>Для начинающих рекомендуется Visual Studio Code из-за его простоты, производительности и отличной поддержки React.</p>
                
                <h2>Способы создания React-приложения</h2>
                
                <h3>1. Create React App (рекомендуется для начинающих)</h3>
                <p>Create React App (CRA) — это официальный инструмент от команды React для быстрого создания новых проектов. Он настраивает всю необходимую инфраструктуру (webpack, Babel, ESLint и др.) автоматически, что позволяет сразу приступить к написанию кода.</p>
                
                <p>Для создания нового проекта с помощью CRA выполните в терминале:</p>
                <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>
                
                <p>Где <code>my-app</code> — название вашего проекта.</p>
                
                <h3>2. Vite</h3>
                <p>Vite — это более современный и быстрый инструмент для создания фронтенд-приложений. Он обеспечивает более быструю компиляцию и горячую замену модулей по сравнению с CRA.</p>
                
                <p>Для создания React-проекта с помощью Vite:</p>
                <pre><code>npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev</code></pre>
                
                <h3>3. Next.js</h3>
                <p>Next.js — это фреймворк для React, который предоставляет дополнительные возможности, такие как серверный рендеринг, статическая генерация, маршрутизация и др.</p>
                
                <p>Для создания проекта с Next.js:</p>
                <pre><code>npx create-next-app@latest my-app
cd my-app
npm run dev</code></pre>
                
                <h2>Расширения для VS Code</h2>
                <p>Если вы используете Visual Studio Code, рекомендуется установить следующие расширения для более комфортной работы с React:</p>
                <ul>
                  <li><strong>ESLint</strong> — для проверки кода на ошибки и соблюдение стилевых правил</li>
                  <li><strong>Prettier</strong> — для автоматического форматирования кода</li>
                  <li><strong>ES7+ React/Redux/React-Native snippets</strong> — для быстрого создания компонентов и других элементов React</li>
                  <li><strong>Auto Import</strong> — для автоматического импорта модулей</li>
                  <li><strong>Path Intellisense</strong> — для автодополнения путей к файлам</li>
                </ul>
                
                <h2>Структура проекта Create React App</h2>
                <p>После создания проекта с помощью Create React App, вы увидите следующую структуру файлов:</p>
                <pre><code>my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg</code></pre>
                
                <p>Основные файлы и директории:</p>
                <ul>
                  <li><strong>public/index.html</strong> — HTML-шаблон для вашего приложения</li>
                  <li><strong>src/index.js</strong> — точка входа JavaScript</li>
                  <li><strong>src/App.js</strong> — корневой компонент React</li>
                  <li><strong>package.json</strong> — файл с зависимостями и скриптами проекта</li>
                </ul>
                
                <h2>Заключение</h2>
                <p>Теперь, когда вы настроили окружение разработки, вы готовы приступить к созданию вашего первого React-приложения. В следующей статье мы рассмотрим, как создать простое приложение и познакомимся с основными концепциями React.</p>
              `
            },
            {
              id: 3,
              title: 'Создание первого React-приложения',
              readTime: '20 мин',
              content: `
                <h2>Создание первого React-приложения</h2>
                <p>В этой статье мы создадим простое React-приложение с нуля, используя Create React App. Вы узнаете, как работать с компонентами, состоянием и пропсами — основными концепциями React.</p>
                
                <h2>Шаг 1: Создание нового проекта</h2>
                <p>Если вы еще не создали проект, выполните следующие команды в терминале:</p>
                <pre><code>npx create-react-app my-first-app
cd my-first-app
npm start</code></pre>
                
                <p>После выполнения этих команд, в браузере автоматически откроется страница с шаблонным приложением React на адресе <code>http://localhost:3000</code>.</p>
                
                <h2>Шаг 2: Знакомство со структурой проекта</h2>
                <p>Откройте проект в вашем редакторе кода. Основные файлы, с которыми мы будем работать, находятся в директории <code>src</code>:</p>
                <ul>
                  <li><strong>src/index.js</strong> — точка входа в приложение</li>
                  <li><strong>src/App.js</strong> — главный компонент приложения</li>
                  <li><strong>src/App.css</strong> — стили для главного компонента</li>
                </ul>
                
                <h2>Шаг 3: Очистка шаблонного кода</h2>
                <p>Давайте упростим шаблонное приложение, чтобы начать с чистого листа. Откройте файл <code>src/App.js</code> и замените его содержимое следующим кодом:</p>
                
                <pre><code>import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Мое первое React-приложение</h1>
        <p>Привет, мир!</p>
      </header>
    </div>
  );
}

export default App;</code></pre>
                
                <p>Также упростим стили в файле <code>src/App.css</code>:</p>
                
                <pre><code>.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}</code></pre>
                
                <h2>Шаг 4: Создание первого компонента</h2>
                <p>Теперь создадим наш первый собственный компонент. Создайте новый файл <code>src/components/Greeting.js</code> со следующим содержимым:</p>
                
                <pre><code>import React from 'react';

function Greeting(props) {
  return (
    <div>
      <h2>Привет, {props.name}!</h2>
      <p>{props.message}</p>
    </div>
  );
}

export default Greeting;</code></pre>
                
                <p>Этот компонент принимает два пропса: <code>name</code> и <code>message</code>, и отображает их в разметке.</p>
                
                <h2>Шаг 5: Использование компонента</h2>
                <p>Теперь давайте использовать наш компонент в главном приложении. Обновите файл <code>src/App.js</code>:</p>
                
                <pre><code>import React from 'react';
import './App.css';
import Greeting from './components/Greeting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Мое первое React-приложение</h1>
        <Greeting name="Пользователь" message="Добро пожаловать в мир React!" />
      </header>
    </div>
  );
}

export default App;</code></pre>
                
                <h2>Шаг 6: Добавление состояния</h2>
                <p>Теперь давайте добавим состояние (state) в наше приложение. Создадим компонент счетчика. Создайте новый файл <code>src/components/Counter.js</code>:</p>
                
                <pre><code>import React, { useState } from 'react';

function Counter() {
  // Используем хук useState для создания состояния
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Счетчик: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
      <button onClick={() => setCount(count - 1)}>Уменьшить</button>
      <button onClick={() => setCount(0)}>Сбросить</button>
    </div>
  );
}

export default Counter;</code></pre>
                
                <p>Теперь добавим этот компонент в наше приложение. Обновите файл <code>src/App.js</code>:</p>
                
                <pre><code>import React from 'react';
import './App.css';
import Greeting from './components/Greeting';
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Мое первое React-приложение</h1>
        <Greeting name="Пользователь" message="Добро пожаловать в мир React!" />
        <Counter />
      </header>
    </div>
  );
}

export default App;</code></pre>
                
                <h2>Шаг 7: Добавление условного рендеринга</h2>
                <p>Давайте добавим условный рендеринг в наш компонент счетчика. Обновите файл <code>src/components/Counter.js</code>:</p>
                
                <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Счетчик: {count}</h2>
      {count > 0 ? (
        <p>Значение положительное</p>
      ) : count < 0 ? (
        <p>Значение отрицательное</p>
      ) : (
        <p>Значение равно нулю</p>
      )}
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
      <button onClick={() => setCount(count - 1)}>Уменьшить</button>
      <button onClick={() => setCount(0)}>Сбросить</button>
    </div>
  );
}

export default Counter;</code></pre>
                
                <h2>Шаг 8: Добавление списка</h2>
                <p>Теперь давайте создадим компонент, который отображает список элементов. Создайте новый файл <code>src/components/TodoList.js</code>:</p>
                
                <pre><code>import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить React', completed: false },
    { id: 2, text: 'Создать приложение', completed: false },
    { id: 3, text: 'Развернуть приложение', completed: false }
  ]);
  
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  return (
    <div>
      <h2>Список задач</h2>
      <div>
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Новая задача"
        />
        <button onClick={addTodo}>Добавить</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;</code></pre>
                
                <p>Добавьте этот компонент в <code>src/App.js</code>:</p>
                
                <pre><code>import React from 'react';
import './App.css';
import Greeting from './components/Greeting';
import Counter from './components/Counter';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Мое первое React-приложение</h1>
        <Greeting name="Пользователь" message="Добро пожаловать в мир React!" />
        <Counter />
        <TodoList />
      </header>
    </div>
  );
}

export default App;</code></pre>
                
                <h2>Заключение</h2>
                <p>Поздравляем! Вы создали свое первое React-приложение, которое демонстрирует основные концепции React:</p>
                <ul>
                  <li>Компоненты</li>
                  <li>Пропсы</li>
                  <li>Состояние (с использованием хука useState)</li>
                  <li>Условный рендеринг</li>
                  <li>Рендеринг списков</li>
                  <li>Обработка событий</li>
                </ul>
                
                <p>Это базовые знания, которые помогут вам начать разработку на React. В следующих статьях мы рассмотрим более продвинутые темы, такие как хуки, контекст, маршрутизация и работа с API.</p>
              `
            }
          ]
        },
        {
          id: 2,
          title: 'Компоненты и пропсы',
          articles: [
            {
              id: 4,
              title: 'Функциональные и классовые компоненты',
              readTime: '15 мин',
              content: `
                <h2>Функциональные и классовые компоненты в React</h2>
                <p>В React существует два основных способа создания компонентов: функциональные компоненты и классовые компоненты. В этой статье мы рассмотрим оба подхода, их особенности, преимущества и недостатки.</p>
                
                <h2>Классовые компоненты</h2>
                <p>Исторически классовые компоненты были основным способом создания компонентов в React. Они представляют собой классы JavaScript, которые наследуются от <code>React.Component</code>.</p>
                
                <h3>Синтаксис классового компонента</h3>
                <pre><code>import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}

export default Welcome;</code></pre>
                
                <p>Классовые компоненты имеют следующие особенности:</p>
                <ul>
                  <li>Должны содержать метод <code>render()</code>, который возвращает JSX</li>
                  <li>Имеют доступ к жизненному циклу компонента через методы, такие как <code>componentDidMount</code>, <code>componentDidUpdate</code>, <code>componentWillUnmount</code> и др.</li>
                  <li>Могут иметь локальное состояние (state)</li>
                  <li>Получают пропсы через <code>this.props</code></li>
                </ul>
                
                <h3>Пример классового компонента с состоянием и методами жизненного цикла</h3>
                <pre><code>import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    // Привязка контекста this к методам
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  
  componentDidMount() {
    console.log('Компонент был смонтирован');
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('Счетчик изменился:', this.state.count);
    }
  }
  
  componentWillUnmount() {
    console.log('Компонент будет размонтирован');
  }
  
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  
  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
  
  render() {
    return (
      <div>
        <h2>Счетчик: {this.state.count}</h2>
        <button onClick={this.increment}>Увеличить</button>
        <button onClick={this.decrement}>Уменьшить</button>
      </div>
    );
  }
}

export default Counter;</code></pre>
                
                <h2>Функциональные компоненты</h2>
                <p>Функциональные компоненты — это JavaScript-функции, которые принимают пропсы в качестве аргумента и возвращают JSX. С появлением хуков в React 16.8 функциональные компоненты получили возможность использовать состояние и другие возможности React, которые раньше были доступны только классовым компонентам.</p>
                
                <h3>Синтаксис функционального компонента</h3>
                <pre><code>import React from 'react';

function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

export default Welcome;</code></pre>
                
                <p>Или с использованием стрелочной функции:</p>
                
                <pre><code>import React from 'react';

const Welcome = (props) => {
  return <h1>Привет, {props.name}</h1>;
};

export default Welcome;</code></pre>
                
                <p>Функциональные компоненты имеют следующие особенности:</p>
                <ul>
                  <li>Более лаконичный синтаксис</li>
                  <li>С появлением хуков могут использовать состояние и эффекты</li>
                  <li>Легче тестировать и отлаживать</li>
                  <li>Лучше оптимизируются React</li>
                </ul>
                
                <h3>Пример функционального компонента с хуками</h3>
                <pre><code>import React, { useState, useEffect } from 'react';

function Counter() {
  // Хук useState для управления состоянием
  const [count, setCount] = useState(0);
  
  // Хук useEffect для выполнения побочных эффектов
  useEffect(() => {
    console.log('Компонент был смонтирован или обновлен');
    
    // Функция очистки, аналог componentWillUnmount
    return () => {
      console.log('Компонент будет размонтирован');
    };
  }, [count]); // Зависимость: эффект будет выполняться при изменении count
  
  return (
    <div>
      <h2>Счетчик: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
      <button onClick={() => setCount(count - 1)}>Уменьшить</button>
    </div>
  );
}

export default Counter;</code></pre>
                
                <h2>Сравнение функциональных и классовых компонентов</h2>
                
                <h3>Преимущества функциональных компонентов</h3>
                <ul>
                  <li><strong>Простота</strong>: Функциональные компоненты проще писать и понимать</li>
                  <li><strong>Меньше кода</strong>: Требуют меньше шаблонного кода</li>
                  <li><strong>Хуки</strong>: Предоставляют более интуитивный способ работы с состоянием и жизненным циклом</li>
                  <li><strong>Производительность</strong>: Могут быть оптимизированы React более эффективно</li>
                  <li><strong>Тестирование</strong>: Легче тестировать, так как это обычные функции</li>
                </ul>
                
                <h3>Преимущества классовых компонентов</h3>
                <ul>
                  <li><strong>Знакомый синтаксис</strong>: Для разработчиков, привыкших к ООП</li>
                  <li><strong>Более зрелая документация</strong>: Больше примеров и ресурсов</li>
                  <li><strong>Некоторые паттерны</strong>: Некоторые паттерны проще реализовать с классовыми компонентами</li>
                </ul>
                
                <h2>Современные рекомендации</h2>
                <p>В современной разработке на React рекомендуется использовать функциональные компоненты с хуками по следующим причинам:</p>
                <ul>
                  <li>Команда React активно развивает и оптимизирует хуки</li>
                  <li>Новые возможности React часто сначала появляются для функциональных компонентов</li>
                  <li>Функциональные компоненты лучше соответствуют декларативной парадигме React</li>
                </ul>
                
                <h2>Заключение</h2>
                <p>Хотя классовые компоненты по-прежнему поддерживаются и будут поддерживаться в обозримом будущем, функциональные компоненты с хуками стали предпочтительным способом написания компонентов в React. Если вы только начинаете изучать React, рекомендуется сосредоточиться на функциональных компонентах и хуках.</p>
                
                <p>В следующей статье мы более подробно рассмотрим пропсы и их использование для передачи данных между компонентами.</p>
              `
            }
          ]
        }
      ]
    }
  };
  
  // Получаем данные курса, модуля и статьи по id
  const course = courses[courseId || '1'];
  
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
  
  // Находим модуль по id
  const moduleIndex = parseInt(moduleId || '1', 10) - 1;
  const module = course.modules[moduleIndex];
  
  if (!module) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Модуль не найден</h1>
          <p className="text-gray-600 mb-6">Запрашиваемый модуль не существует или был удален.</p>
          <Link to={`/courses/${courseId}`} className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к курсу
          </Link>
        </div>
      </div>
    );
  }
  
  // Находим статью по id
  const articleIndex = parseInt(articleId || '1', 10) - 1;
  const article = module.articles[articleIndex];
  
  if (!article) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
          <p className="text-gray-600 mb-6">Запрашиваемая статья не существует или была удалена.</p>
          <Link to={`/courses/${courseId}`} className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к курсу
          </Link>
        </div>
      </div>
    );
  }
  
  // Получаем градиент для курса
  const gradient = getGradientById(courseId || '1');
  
  // Определяем предыдущую и следующую статьи
  const prevArticle = articleIndex > 0 
    ? { moduleId, articleId: (articleIndex).toString() } 
    : moduleIndex > 0 
      ? { moduleId: (moduleIndex).toString(), articleId: (course.modules[moduleIndex - 1].articles.length - 1).toString() }
      : null;
      
  const nextArticle = articleIndex < module.articles.length - 1
    ? { moduleId, articleId: (articleIndex + 2).toString() }
    : moduleIndex < course.modules.length - 1
      ? { moduleId: (moduleIndex + 2).toString(), articleId: '1' }
      : null;

  // Создаем массив всех статей для навигации по клавишам
  const allArticles: Array<{moduleId: string; articleId: string; title: string}> = [];
  course.modules.forEach((m, mIdx) => {
    m.articles.forEach((a, aIdx) => {
      allArticles.push({
        moduleId: (mIdx + 1).toString(),
        articleId: (aIdx + 1).toString(),
        title: a.title
      });
    });
  });
  
  // Находим текущий индекс статьи в общем массиве
  const currentArticleIndex = allArticles.findIndex(
    a => a.moduleId === moduleId && a.articleId === articleId
  );
  
  // Обработчик клавиатурных событий для навигации
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevArticle) {
        navigate(`/courses/${courseId}/modules/${prevArticle.moduleId}/articles/${prevArticle.articleId}`);
      } else if (e.key === 'ArrowRight' && nextArticle) {
        navigate(`/courses/${courseId}/modules/${nextArticle.moduleId}/articles/${nextArticle.articleId}`);
      } else if (e.key === 'Escape') {
        navigate(`/courses/${courseId}`);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [courseId, navigate, nextArticle, prevArticle]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Мобильная навигация */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <h2 className="text-lg font-semibold truncate">{article.title}</h2>
        </div>
        <Link to="/" className="p-2 rounded-full hover:bg-gray-100">
          <Home className="h-6 w-6" />
        </Link>
      </div>
      
      {/* Мобильный сайдбар */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
          <div 
            className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-white p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Содержание курса</h2>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <Link to={`/courses/${courseId}`} className="flex items-center text-blue-600 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Назад к курсу</span>
            </Link>
            
            <div className="space-y-4">
              {course.modules.map((m, mIndex) => (
                <div key={m.id} className={`${mIndex === moduleIndex ? 'border-blue-500' : 'border-gray-200'} border rounded-lg overflow-hidden`}>
                  <div className={`${mIndex === moduleIndex ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-800'} p-3 font-medium`}>
                    {mIndex + 1}. {m.title}
                  </div>
                  <div className="divide-y divide-gray-200">
                    {m.articles.map((a, aIndex) => (
                      <Link 
                        key={a.id}
                        to={`/courses/${courseId}/modules/${mIndex + 1}/articles/${aIndex + 1}`}
                        className={`block p-3 hover:bg-gray-50 transition-colors ${aIndex === articleIndex && mIndex === moduleIndex ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <div className="flex items-center">
                          {a.isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          ) : aIndex === articleIndex && mIndex === moduleIndex ? (
                            <div className="w-4 h-4 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-300 mr-3 flex-shrink-0"></div>
                          )}
                          <span>{mIndex + 1}.{aIndex + 1} {a.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="container-custom py-12 pt-24 lg:pt-12">
        {/* Верхняя навигация - только на десктопе */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <Link to={`/courses/${courseId}`} className="text-blue-600 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Назад к курсу</span>
          </Link>
          <Link to="/" className="text-blue-600 hover:underline flex items-center">
            <Home className="h-4 w-4 mr-2" />
            <span>На главную</span>
          </Link>
        </div>
        
        {/* Заголовок курса с градиентным фоном */}
        <div className={`bg-gradient-to-r ${gradient} rounded-xl shadow-lg p-6 mb-8 text-white`}>
          <h1 className="text-2xl font-bold mb-2 font-['Poppins',_sans-serif]">{course.title}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Боковая панель с содержанием курса - только на десктопе */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Содержание курса</h2>
                <Link to={`/courses/${courseId}`} className="text-blue-600 hover:text-blue-800">
                  <List className="h-5 w-5" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {course.modules.map((m, mIndex) => (
                  <div key={m.id} className={`${mIndex === moduleIndex ? 'border-blue-500' : 'border-gray-200'} border rounded-lg overflow-hidden`}>
                    <div className={`${mIndex === moduleIndex ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-800'} p-3 font-medium`}>
                      {mIndex + 1}. {m.title}
                    </div>
                    {mIndex === moduleIndex && (
                      <div className="divide-y divide-gray-200">
                        {m.articles.map((a, aIndex) => (
                          <Link 
                            key={a.id}
                            to={`/courses/${courseId}/modules/${moduleIndex + 1}/articles/${aIndex + 1}`}
                            className={`block p-3 hover:bg-gray-50 transition-colors ${aIndex === articleIndex ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                          >
                            <div className="flex items-center">
                              {a.isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                              ) : aIndex === articleIndex ? (
                                <div className="w-4 h-4 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-gray-300 mr-3 flex-shrink-0"></div>
                              )}
                              <span>{mIndex + 1}.{aIndex + 1} {a.title}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Основное содержимое статьи */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl lg:text-2xl font-bold">{article.title}</h2>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{article.readTime}</span>
                </div>
              </div>
              
              <div 
                className="prose prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
            
            {/* Навигация по статьям */}
            <div className="flex justify-between items-center bg-white rounded-xl shadow-lg p-4">
              {prevArticle ? (
                <Link 
                  to={`/courses/${courseId}/modules/${prevArticle.moduleId}/articles/${prevArticle.articleId}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 group bg-blue-50 hover:bg-blue-100 rounded-lg p-3 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-sm text-blue-400">Предыдущая статья</div>
                    <div className="font-medium">
                      {allArticles[currentArticleIndex - 1]?.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div></div>
              )}
              
              {nextArticle ? (
                <Link 
                  to={`/courses/${courseId}/modules/${nextArticle.moduleId}/articles/${nextArticle.articleId}`}
                  className="flex items-center text-right text-blue-600 hover:text-blue-800 group bg-blue-50 hover:bg-blue-100 rounded-lg p-3 transition-colors"
                >
                  <div>
                    <div className="text-sm text-blue-400">Следующая статья</div>
                    <div className="font-medium">
                      {allArticles[currentArticleIndex + 1]?.title}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link 
                  to={`/courses/${courseId}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 group bg-green-50 hover:bg-green-100 rounded-lg p-3 transition-colors"
                >
                  <div>
                    <div className="text-sm text-green-500">Поздравляем!</div>
                    <div className="font-medium">Завершить курс</div>
                  </div>
                  <CheckCircle className="h-5 w-5 ml-2 text-green-500 group-hover:scale-110 transition-transform" />
                </Link>
              )}
            </div>
            
            {/* Советы по навигации */}
            <div className="mt-4 text-center text-gray-500 text-sm">
              <p>Используйте клавиши ← и → для навигации между статьями, Esc для возврата к курсу</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseArticlePage;
