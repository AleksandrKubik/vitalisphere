import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Типы для пользователя
interface User {
  id: number;
  name: string;
  email: string;
  roles?: {
    id: number;
    name: string;
  }[];
  settings?: {
    theme: string;
    language: string;
    notifications_enabled: boolean;
  };
}

// Типы для контекста авторизации
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Создаем контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Хук для использования контекста
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Провайдер контекста
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true); // Начинаем с загрузки
  const [error, setError] = useState<string | null>(null);
  const [loadingRetries, setLoadingRetries] = useState<number>(0);

  // Проверяем, авторизован ли пользователь
  const isAuthenticated = !!token && !!user;

  // Настраиваем axios для использования токена
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Загружаем информацию о пользователе при наличии токена
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get('/api/auth/user');
        setUser(response.data.user);
        setError(null);
        setLoadingRetries(0); // Сбрасываем счетчик повторных попыток
      } catch (err: any) {
        console.error('Error loading user:', err);
        
        // Проверяем, является ли ошибка проблемой с сетью
        if (err.message === 'Network Error' && loadingRetries < 3) {
          // Если это сетевая ошибка и мы не превысили лимит повторных попыток,
          // пробуем снова через 1 секунду
          console.log(`Retrying to load user (${loadingRetries + 1}/3)...`);
          setLoadingRetries(prev => prev + 1);
          setTimeout(() => loadUser(), 1000);
          return;
        }
        
        // Если это ошибка авторизации (401) или мы исчерпали попытки,
        // выходим из системы
        if (err.response?.status === 401 || loadingRetries >= 3) {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
          setError('Session expired. Please login again.');
        } else {
          // Для других ошибок просто показываем сообщение, но не выходим
          setError('Error loading user data. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [token, loadingRetries]);

  // Функция для входа
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      const { user, access_token } = response.data;
      
      setUser(user);
      setToken(access_token);
      localStorage.setItem('token', access_token);
      
      return user;
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Обрабатываем различные ошибки
      if (err.response) {
        // Ошибка от сервера
        if (err.response.status === 401) {
          setError('Invalid email or password');
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Login failed. Please try again.');
        }
      } else if (err.request) {
        // Нет ответа от сервера
        setError('Server not responding. Please try again later.');
      } else {
        // Другие ошибки
        setError('An error occurred. Please try again.');
      }
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для выхода
  const logout = async () => {
    setIsLoading(true);
    
    try {
      if (token) {
        // Вызываем API для выхода
        await axios.post('/api/auth/logout');
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Очищаем состояние независимо от результата запроса
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      setIsLoading(false);
    }
  };

  // Значение контекста
  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
