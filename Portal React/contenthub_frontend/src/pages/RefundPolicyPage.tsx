import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, CreditCard, Clock, Shield, CheckCircle, XCircle, Mail } from 'lucide-react';

const RefundPolicyPage: React.FC = () => {
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
              <RefreshCw className="h-4 w-4" />
              Refund & Cancellation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 mb-4">
              Refund Policy
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
                  <RefreshCw className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Refund Process</h3>
                    <p className="text-sm text-blue-700">How to request and receive refunds</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                  <Clock className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Timeframes</h3>
                    <p className="text-sm text-green-700">Processing and approval timelines</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <CreditCard className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">Payment Methods</h3>
                    <p className="text-sm text-purple-700">How refunds are processed</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <Shield className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-1">Customer Protection</h3>
                    <p className="text-sm text-orange-700">Your rights and guarantees</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              Overview
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              At VITALISPHERE LIMITED, we strive to provide exceptional service and value to our customers. 
              This refund policy outlines the terms and conditions for refunds and cancellations for our services 
              at <a href="https://edfuncontent.com" className="text-blue-600 hover:text-blue-700 font-medium">https://edfuncontent.com</a>.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">2</span>
              </div>
              Refund Eligibility
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We offer refunds under the following circumstances:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Service Issues</h3>
                  <p className="text-green-700">Technical problems preventing service access for more than 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Billing Errors</h3>
                  <p className="text-green-700">Duplicate charges or incorrect billing amounts</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Cancellation Within 7 Days</h3>
                  <p className="text-green-700">New subscriptions cancelled within 7 days of purchase</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              Non-Refundable Items
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The following are generally not eligible for refunds:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Used Services</h3>
                  <p className="text-red-700">Services that have been actively used or consumed</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Promotional Offers</h3>
                  <p className="text-red-700">Free trials and promotional subscriptions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Policy Violations</h3>
                  <p className="text-red-700">Accounts suspended for terms of service violations</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              Refund Process
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              To request a refund, follow these steps:
            </p>
            <ol className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold text-sm">1</span>
                </div>
                <span className="text-slate-700">Contact our support team at <a href="mailto:help@vitalisphereltd.com" className="text-blue-600 hover:text-blue-700 font-medium">help@vitalisphereltd.com</a></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold text-sm">2</span>
                </div>
                <span className="text-slate-700">Provide your account details and reason for refund</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold text-sm">3</span>
                </div>
                <span className="text-slate-700">Our team will review your request within 3-5 business days</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold text-sm">4</span>
                </div>
                <span className="text-slate-700">If approved, refund will be processed to your original payment method</span>
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-bold">5</span>
              </div>
              Refund Timeframes
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Refund processing times vary depending on your payment method:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Credit/Debit Cards:</strong> 5-10 business days</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>PayPal:</strong> 3-5 business days</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700"><strong>Bank Transfers:</strong> 7-14 business days</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-bold">6</span>
              </div>
              Cancellation Policy
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You may cancel your subscription at any time:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Through your account settings on our website</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">By contacting our support team</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Cancellation takes effect at the end of your current billing period</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100 mb-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Pro-Rated Refunds
              </h3>
              <p className="text-indigo-800">
                For annual subscriptions cancelled mid-term, we may offer pro-rated refunds based on unused service time, 
                subject to review and approval.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <span className="text-teal-600 font-bold">7</span>
              </div>
              Dispute Resolution
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              If you disagree with a refund decision, you may:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Request a review by our management team</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Contact your payment provider for chargeback options</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Seek mediation through consumer protection agencies</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                <span className="text-pink-600 font-bold">8</span>
              </div>
              Changes to This Policy
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting 
              on our website. We will notify users of significant changes via email or website notification.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 font-bold">9</span>
              </div>
              Contact Information
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              For refund requests or questions about this policy, please contact us:
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
                <p>Response Time: Within 24-48 hours during business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage; 