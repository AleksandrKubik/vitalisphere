import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, AlertCircle, Loader, CreditCard, Calendar, User, Shield, Check } from 'lucide-react';

// Градиенты для фона (такие же, как в LoginPage)
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

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [autoRenewalAccepted, setAutoRenewalAccepted] = useState(false);
  const [formError, setFormError] = useState('');
  
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  // Выбираем случайный градиент для фона
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Валидация формы
    if (!name.trim()) {
      setFormError('Name is required');
      return;
    }
    
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    if (!password) {
      setFormError('Password is required');
      return;
    }
    
    if (!cardHolder.trim()) {
      setFormError('Card holder name is required');
      return;
    }
    
    if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length !== 16) {
      setFormError('Valid card number is required');
      return;
    }
    
    if (!expirationDate.trim() || !expirationDate.match(/^\d{2}\/\d{2}$/)) {
      setFormError('Valid expiration date is required (MM/YY)');
      return;
    }
    
    if (!cvv.trim() || !cvv.match(/^\d{3,4}$/)) {
      setFormError('Valid CVV is required');
      return;
    }
    
    if (!termsAccepted) {
      setFormError('You must accept the terms and conditions');
      return;
    }
    
    if (!autoRenewalAccepted) {
      setFormError('You must accept the auto-renewal terms');
      return;
    }
    
    try {
      // В реальном приложении здесь был бы запрос на регистрацию и оплату
      // Для демонстрации просто перенаправляем на главную страницу
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
      setFormError('Registration failed. Please try again.');
    }
  };
  
  // Форматирование номера карты в формате XXXX XXXX XXXX XXXX
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Форматирование даты истечения срока действия карты в формате MM/YY
  const formatExpirationDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    
    return v;
  };
  
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${randomGradient} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-['Poppins',_sans-serif] text-gray-900 mb-2">
            Welcome to ContentHubMedia
          </h1>
          <p className="text-gray-600 text-lg">
            Premium access to videos, music, articles, courses, and games.
          </p>
          <p className="text-blue-600 font-medium mt-2">
            1-Day Trial for $0.01, then $49.99/month with auto-renewal.
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Note: All transactions will be charged in your local currency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Holder Name
                    </label>
                    <input
                      id="card-holder"
                      name="card-holder"
                      type="text"
                      autoComplete="cc-name"
                      required
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="John Doe"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="card-number"
                        name="card-number"
                        type="text"
                        autoComplete="cc-number"
                        required
                        className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiration Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="expiration-date"
                          name="expiration-date"
                          type="text"
                          autoComplete="cc-exp"
                          required
                          className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                          placeholder="MM/YY"
                          value={expirationDate}
                          onChange={(e) => setExpirationDate(formatExpirationDate(e.target.value))}
                          maxLength={5}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Shield className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="cvv"
                          name="cvv"
                          type="text"
                          autoComplete="cc-csc"
                          required
                          className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          maxLength={4}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Note: This transaction will appear as ContentHubMedia on your credit card bill
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      I hereby confirm that I am 18 years of age or older and I accept the <Link to="/terms" className="text-blue-600 hover:text-blue-500">Terms</Link>, <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link> and <Link to="/refund" className="text-blue-600 hover:text-blue-500">Cancellation and Refund Policy</Link>.
                    </label>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="auto-renewal"
                      name="auto-renewal"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={autoRenewalAccepted}
                      onChange={(e) => setAutoRenewalAccepted(e.target.checked)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="auto-renewal" className="font-medium text-gray-700">
                      I agree that at the end of the trial period, my membership will automatically renew for a price of $49.99/month until I unsubscribe.
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Отображение ошибок */}
              {(error || formError) && (
                <div className="rounded-lg bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {formError || error}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      Processing...
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Join the ContentHubMedia</h3>
            <p className="text-gray-600 mb-6">
              Become part of a community that values entertainment, education, and inspiration. Get access to high-quality content across multiple formats, all in one place.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">All-in-One Platform</h4>
                  <p className="text-gray-600">Access videos, music, articles, courses, and games with a single subscription.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Premium Experience</h4>
                  <p className="text-gray-600">Enjoy a sleek, modern interface with high-quality content and personalized recommendations.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Risk-Free Trial</h4>
                  <p className="text-gray-600">Try ContentHubMedia for just $0.01 for your first day. Cancel anytime if you're not satisfied.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Cancel Anytime</h4>
                  <p className="text-gray-600">No long-term commitments. You can cancel your subscription at any time.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">First day trial</p>
                  <p className="text-2xl font-bold text-gray-900">$0.01</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Then monthly</p>
                  <p className="text-2xl font-bold text-gray-900">$49.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
          <p>Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-500">Log in</Link></p>
          <p className="mt-2">ContentHubMedia &copy; 2025 - All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
