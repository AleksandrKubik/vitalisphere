import React from 'react';
import { Check, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One subscription for all content. No hidden fees, no complicated tiers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">ContentHubMedia Premium</h3>
              <p className="text-blue-100 mb-6">Full access to all features and content</p>
              
              <div className="flex items-center justify-center">
                <span className="text-5xl font-bold">$49.99</span>
                <span className="text-xl ml-2 text-blue-100">/month</span>
              </div>
              
              <p className="mt-2 text-blue-100">
                First day trial for just $0.01
              </p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-bold text-lg mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Unlimited access to all videos</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Unlimited access to all music</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Unlimited access to all articles</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Unlimited access to all courses</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Unlimited access to all games</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4">Additional benefits:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Ad-free experience</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Premium support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Early access to new features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Offline downloads</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Cancel anytime</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <h4 className="font-bold text-lg mb-2">Try it risk-free</h4>
                <p className="text-gray-700">
                  Start with a 1-day trial for just $0.01. After that, your subscription will automatically continue at $49.99/month unless you cancel.
                </p>
              </div>
              
              <div className="text-center">
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Start Your Trial
                </Link>
                <p className="mt-4 text-sm text-gray-500">
                  No long-term contracts. No commitments. Cancel online anytime.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h4 className="font-bold text-lg mb-4">Frequently Asked Questions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              <div>
                <h5 className="font-semibold mb-2">Can I cancel anytime?</h5>
                <p className="text-gray-600">Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.</p>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Is there a free trial?</h5>
                <p className="text-gray-600">We offer a 1-day trial for just $0.01 so you can experience all the premium features before committing.</p>
              </div>
              <div>
                <h5 className="font-semibold mb-2">What payment methods do you accept?</h5>
                <p className="text-gray-600">We accept all major credit cards, PayPal, and Apple Pay.</p>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Can I share my account?</h5>
                <p className="text-gray-600">Your subscription is for individual use only. Family plans will be available soon.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
