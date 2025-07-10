import React from 'react';
import { Layers, Smartphone, Zap, Sparkles, Target } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ContentHubMedia</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our platform is designed with you in mind, offering a premium experience that sets us apart from the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 hover:bg-opacity-15 transition-all duration-300 border border-white border-opacity-20">
            <div className="bg-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Layers className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Multi-Format Content</h3>
            <p className="text-blue-100">
              Access videos, music, articles, courses, and games all in one place. No need to switch between different platforms or subscriptions.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 hover:bg-opacity-15 transition-all duration-300 border border-white border-opacity-20">
            <div className="bg-purple-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Premium Design</h3>
            <p className="text-blue-100">
              Enjoy a sleek, modern interface inspired by Apple's design philosophy. Clean layouts, beautiful typography, and intuitive navigation.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 hover:bg-opacity-15 transition-all duration-300 border border-white border-opacity-20">
            <div className="bg-indigo-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Smartphone className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Mobile-First Experience</h3>
            <p className="text-blue-100">
              Optimized for all devices, with special attention to mobile experience. Enjoy ContentHubMedia on your phone, tablet, or desktop with equal quality.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 hover:bg-opacity-15 transition-all duration-300 border border-white border-opacity-20">
            <div className="bg-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">High Performance</h3>
            <p className="text-blue-100">
              Lightning-fast loading times, smooth navigation, and optimized media playback. We've built ContentHubMedia to be responsive and efficient.
            </p>
          </div>

          {/* Benefit 5 */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 hover:bg-opacity-15 transition-all duration-300 border border-white border-opacity-20">
            <div className="bg-purple-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Target className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Personalized Experience</h3>
            <p className="text-blue-100">
              Our recommendation algorithms learn from your preferences to suggest content you'll love. Discover new favorites tailored to your interests.
            </p>
          </div>

          {/* Benefit 6 */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 hover:bg-opacity-15 transition-all duration-300 border border-white border-opacity-20">
            <div className="bg-indigo-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Single Subscription</h3>
            <p className="text-blue-100">
              One affordable subscription gives you access to everything. No hidden fees, no separate purchases, just unlimited access to all content.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join thousands of satisfied users who have made ContentHubMedia their go-to platform for entertainment, education, and inspiration.
          </p>
          <a href="#pricing" className="inline-block px-8 py-4 bg-white text-blue-900 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
            View Pricing
          </a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
