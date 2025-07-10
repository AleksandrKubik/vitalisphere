import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Users, CreditCard, Lock, Globe } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
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
              <FileText className="h-4 w-4" />
              Legal Document
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 mb-4">
              Terms of Service
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
                  <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Service Agreement</h3>
                    <p className="text-sm text-blue-700">Comprehensive terms for using our platform</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                  <Users className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">User Rights</h3>
                    <p className="text-sm text-green-700">Your rights and responsibilities</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <CreditCard className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">Payment Terms</h3>
                    <p className="text-sm text-purple-700">Subscription and billing policies</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <Lock className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-1">Security</h3>
                    <p className="text-sm text-orange-700">Data protection and security measures</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              Acceptance of Terms
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              By accessing and using <a href="https://edfuncontent.com" className="text-blue-600 hover:text-blue-700 font-medium">https://edfuncontent.com</a> ("Service"), 
              you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">2</span>
              </div>
              Description of Service
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              edfuncontent.com provides a comprehensive media platform offering videos, music, articles, courses, and games. 
              The Service is operated by VITALISPHERE LIMITED ("Company", "we", "us", or "our").
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              User Accounts
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
              You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              Subscription and Billing
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Some features of the Service require a paid subscription. By subscribing, you agree to pay all charges at the prices 
              then in effect for your use of the Service. All payments are non-refundable except as expressly stated in our 
              Cancellation and Refund Policy.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-bold">5</span>
              </div>
              Acceptable Use
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Violate any applicable laws or regulations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Infringe upon the rights of others</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Transmit harmful, offensive, or inappropriate content</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Attempt to gain unauthorized access to the Service</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Interfere with the proper functioning of the Service</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-bold">6</span>
              </div>
              Intellectual Property
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              The Service and its original content, features, and functionality are and will remain the exclusive property of 
              VITALISPHERE LIMITED and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <span className="text-teal-600 font-bold">7</span>
              </div>
              Privacy Policy
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
              to understand our practices.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                <span className="text-pink-600 font-bold">8</span>
              </div>
              Termination
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, 
              under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach 
              of the Terms.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 font-bold">9</span>
              </div>
              Limitation of Liability
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              In no event shall VITALISPHERE LIMITED, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                <span className="text-cyan-600 font-bold">10</span>
              </div>
              Governing Law
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              These Terms shall be interpreted and governed by the laws of Cyprus, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-600 font-bold">11</span>
              </div>
              Changes to Terms
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
              we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                <span className="text-rose-600 font-bold">12</span>
              </div>
              Contact Information
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">VITALISPHERE LIMITED</h3>
              </div>
              <div className="space-y-2 text-blue-800">
                <p>2314, Nicosia, Cyprus, Glyfou, 29A</p>
                <p>Email: <a href="mailto:help@vitalisphereltd.com" className="text-blue-600 hover:text-blue-700 font-medium">help@vitalisphereltd.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage; 