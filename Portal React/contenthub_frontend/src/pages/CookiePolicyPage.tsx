import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Settings, Shield, Eye, Database, Bell, Mail } from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 mb-4">
              <Cookie className="h-4 w-4" />
              Cookie Management
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg text-slate-600">Last updated: January 15, 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <Cookie className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">What Are Cookies</h3>
                    <p className="text-sm text-blue-700">Small text files stored on your device</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                  <Settings className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Cookie Control</h3>
                    <p className="text-sm text-green-700">Manage your cookie preferences</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <Eye className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">Analytics</h3>
                    <p className="text-sm text-purple-700">Understanding user behavior</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <Shield className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-1">Security</h3>
                    <p className="text-sm text-orange-700">Protecting your data</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              What Are Cookies
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Cookies are small text files that are placed on your device when you visit our website at 
              <a href="https://edfuncontent.com" className="text-blue-600 hover:text-blue-700 font-medium"> https://edfuncontent.com</a>. 
              They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">2</span>
              </div>
              Types of Cookies We Use
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use several types of cookies for different purposes:
            </p>
            
            <div className="space-y-6 mb-6">
              <div className="p-6 rounded-xl bg-blue-50 border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  Essential Cookies
                </h3>
                <p className="text-blue-800 mb-3">These cookies are necessary for the website to function properly.</p>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Authentication and security</li>
                  <li>• Shopping cart functionality</li>
                  <li>• Basic site navigation</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-xl bg-green-50 border border-green-100">
                <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  Performance Cookies
                </h3>
                <p className="text-green-800 mb-3">These cookies help us understand how visitors interact with our website.</p>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• Page load times and performance</li>
                  <li>• User behavior analytics</li>
                  <li>• Error tracking and debugging</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-xl bg-purple-50 border border-purple-100">
                <h3 className="text-lg font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  Functional Cookies
                </h3>
                <p className="text-purple-800 mb-3">These cookies enable enhanced functionality and personalization.</p>
                <ul className="space-y-1 text-sm text-purple-700">
                  <li>• Language preferences</li>
                  <li>• User interface customization</li>
                  <li>• Remembering your settings</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-xl bg-orange-50 border border-orange-100">
                <h3 className="text-lg font-semibold text-orange-900 mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  Marketing Cookies
                </h3>
                <p className="text-orange-800 mb-3">These cookies are used to deliver relevant advertisements and track marketing campaigns.</p>
                <ul className="space-y-1 text-sm text-orange-700">
                  <li>• Targeted advertising</li>
                  <li>• Social media integration</li>
                  <li>• Campaign effectiveness tracking</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              Third-Party Cookies
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We may also use third-party cookies from trusted partners to enhance our services. These include:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Google Analytics for website analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Payment processors for secure transactions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Social media platforms for sharing features</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              Managing Your Cookie Preferences
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You have several options for managing cookies:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Use our cookie consent banner to control preferences</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Adjust your browser settings to block or delete cookies</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Use browser extensions for enhanced privacy control</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100 mb-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-2 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Important Note
              </h3>
              <p className="text-orange-800">
                Disabling certain cookies may affect the functionality of our website. Essential cookies cannot be disabled 
                as they are necessary for basic site operations.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-bold">5</span>
              </div>
              Cookie Duration
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Cookies have different lifespans:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Session cookies:</strong> Deleted when you close your browser</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Persistent cookies:</strong> Remain on your device for a set period</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Third-party cookies:</strong> Subject to their respective policies</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-bold">6</span>
              </div>
              Updates to This Policy
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, 
              legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <span className="text-teal-600 font-bold">7</span>
              </div>
              Contact Us
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">VITALISPHERE LIMITED</h3>
              </div>
              <div className="space-y-2 text-blue-800">
                <p>2314, Nicosia, Cyprus, Glyfou, 29A</p>
                <p>Email: <a href="mailto:help@vitalisphereltd.com" className="text-blue-600 hover:text-blue-700 font-medium">help@vitalisphereltd.com</a></p>
                <p>Website: <a href="https://edfuncontent.com" className="text-blue-600 hover:text-blue-700 font-medium">https://edfuncontent.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage; 