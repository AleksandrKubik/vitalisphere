import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, Zap, Crown, Users, Shield, Mail, TrendingUp, Clock } from 'lucide-react';

const SubscriptionTermsPage: React.FC = () => {
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
              <Crown className="h-4 w-4" />
              Subscription Terms
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 mb-4">
              Subscription Terms
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
                  <Crown className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Premium Access</h3>
                    <p className="text-sm text-blue-700">Unlimited access to all content</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                  <Calendar className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Billing Cycles</h3>
                    <p className="text-sm text-green-700">Monthly and annual options</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <Zap className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">Auto-Renewal</h3>
                    <p className="text-sm text-purple-700">Seamless service continuation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <Shield className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-1">Flexible Cancellation</h3>
                    <p className="text-sm text-orange-700">Cancel anytime, no penalties</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              Subscription Overview
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              VITALISPHERE LIMITED offers subscription services for <a href="https://edfuncontent.com" className="text-blue-600 hover:text-blue-700 font-medium">https://edfuncontent.com</a> 
              that provide unlimited access to our comprehensive content library including videos, music, articles, courses, and games.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">2</span>
              </div>
              Subscription Plans
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We offer the following subscription options:
            </p>
            
            <div className="space-y-6 mb-6">
              <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Monthly Subscription
                </h3>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Billed monthly at the current rate</li>
                  <li>• Full access to all content categories</li>
                  <li>• HD and 4K streaming quality</li>
                  <li>• Offline downloads (where available)</li>
                  <li>• Priority customer support</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Annual Subscription
                </h3>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• Billed annually with significant savings</li>
                  <li>• All monthly plan features included</li>
                  <li>• Exclusive content and early access</li>
                  <li>• Family sharing options (up to 4 accounts)</li>
                  <li>• Premium customer support</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              Billing and Payment
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Subscription billing terms and conditions:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">All prices are quoted in USD and include applicable taxes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Payment is processed automatically on your billing date</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">We accept major credit cards, PayPal, and other payment methods</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Failed payments may result in service suspension</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              Auto-Renewal
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date. 
              You will be charged the current subscription rate at the time of renewal. We will notify you of any price changes 
              at least 30 days before they take effect.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-bold">5</span>
              </div>
              Cancellation Policy
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You may cancel your subscription at any time:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Through your account settings on our website</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">By contacting our support team</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Cancellation takes effect at the end of your current billing period</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">No refunds for partial billing periods unless required by law</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-bold">6</span>
              </div>
              Service Availability
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              While we strive for 99.9% uptime, our service availability includes:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Scheduled maintenance windows (announced in advance)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Content updates and new releases</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Regional availability may vary</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Internet connectivity requirements apply</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <span className="text-teal-600 font-bold">7</span>
              </div>
              Usage Limits
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Fair use policies apply to prevent abuse:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Maximum 4 concurrent streams per account</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Download limits may apply to certain content</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Sharing accounts with family members only</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Commercial use requires separate licensing</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                <span className="text-pink-600 font-bold">8</span>
              </div>
              Price Changes
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We may change subscription prices from time to time. Price changes will be communicated at least 30 days in advance. 
              If you do not agree to the new price, you may cancel your subscription before the change takes effect. 
              Continued use after a price change constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 font-bold">9</span>
              </div>
              Account Sharing
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Family sharing is available for annual subscriptions:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Up to 4 family members per account</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Each member gets their own profile and preferences</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Parental controls available for children's profiles</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Account owner is responsible for all usage</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                <span className="text-cyan-600 font-bold">10</span>
              </div>
              Promotional Offers
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              From time to time, we may offer promotional pricing or free trial periods. These offers are subject to specific 
              terms and conditions, including eligibility requirements and automatic renewal at the regular price unless cancelled. 
              Promotional offers cannot be combined with other discounts.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-600 font-bold">11</span>
              </div>
              Contact Information
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              For questions about your subscription or these terms, please contact us:
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
                <p>Support Hours: 24/7 for premium subscribers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTermsPage; 