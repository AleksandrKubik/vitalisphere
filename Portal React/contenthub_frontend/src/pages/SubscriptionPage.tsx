import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Mail, Phone, AlertTriangle, FileText, CreditCard, Check, Crown, Users, Zap, Shield } from 'lucide-react';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';

const SubscriptionPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleCancelSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !email) {
      setMessage('Please fill in both phone number and email');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Здесь будет API вызов для отмены подписки
      // Пока что просто симуляция
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage('Your subscription cancellation request has been submitted successfully. You will receive a confirmation email shortly.');
      setPhoneNumber('');
      setEmail('');
    } catch (error) {
      setMessage('An error occurred. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-page">
      <Header />
      
      <div className="pt-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Subscription
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Manage your subscription or start your journey with ContentHubMedia
              </p>
            </div>

            {/* Current Plan Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-blue-600" />
                Subscribe to ContentHubMedia
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">ContentHubMedia Premium</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">$49.99<span className="text-lg text-blue-500">/month</span></div>
                  <p className="text-blue-700 mb-4">Full access to all premium features and content</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-blue-800">Unlimited videos, music, articles</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-blue-800">Unlimited courses and games</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-blue-800">Ad-free experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-blue-800">Offline downloads</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-blue-800">Premium support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-blue-800">Personalized recommendations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-blue-800">Access on unlimited devices</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-blue-800">Early access to new features</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-blue-800">High-quality 4K content</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-blue-800">Cancel anytime, no fees</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                    <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Start Your Trial
                    </h4>
                    <p className="text-green-700 mb-4">Try ContentHubMedia Premium for just $0.01 for your first day!</p>
                    <Link 
                      to="/register" 
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Start Free Trial
                    </Link>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                    <h4 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Risk-Free Guarantee
                    </h4>
                    <ul className="space-y-2 text-purple-800">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-600" />
                        <span>No long-term commitments</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-600" />
                        <span>Cancel anytime</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-600" />
                        <span>Full refund if not satisfied</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Cancellation Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <X className="h-8 w-8 text-red-600" />
                  Cancel Subscription
                </h2>
                <p className="text-lg text-slate-700 mb-6">
                  We're sorry to see you go. You can cancel your subscription at any time with no cancellation fees.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <p className="text-slate-700">
                      Insert your phone number and email address below
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <p className="text-slate-700">
                      Click on the 'Cancel Subscription' button for the subscription you wish to be cancelled
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <p className="text-slate-700">
                      Done! You'll receive a confirmation email
                    </p>
                  </div>
                </div>
              </div>

              {/* Cancellation Form */}
              <div className="p-8">
                <form onSubmit={handleCancelSubscription} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  {message && (
                    <div className={`p-4 rounded-lg ${
                      message.includes('error') 
                        ? 'bg-red-50 border border-red-200 text-red-700' 
                        : 'bg-green-50 border border-green-200 text-green-700'
                    }`}>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <p>{message}</p>
                      </div>
                    </div>
                  )}

                  {/* Cancel Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5" />
                        Cancel Subscription
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Important Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  Cancellation Policy
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>No cancellation fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Access continues until end of billing period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>Can reactivate anytime</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-blue-600" />
                  Need Help?
                </h3>
                <p className="text-slate-700 mb-4">
                  If you have any questions about your subscription, please contact our support team:
                </p>
                <a 
                  href="mailto:help@vitalisphereltd.com"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Mail className="h-4 w-4" />
                  help@vitalisphereltd.com
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="text-center">
              <Link 
                to="/subscription-terms"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                <FileText className="h-4 w-4" />
                View Subscription Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SubscriptionPage; 