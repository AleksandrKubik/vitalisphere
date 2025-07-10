import React from 'react';
import { Play, TrendingUp, Clock, ThumbsUp, Share2 } from 'lucide-react';

const VideoSection: React.FC = () => {
  return (
    <section id="video" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Short Videos for Great Mood</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover thousands of entertaining and educational short videos that will brighten your day and expand your horizons.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
              {/* Используем предоставленную иллюстрацию */}
              <div className="w-full aspect-square rounded-xl mb-6 flex items-center justify-center">
                <img 
                  src="/landing/video.png" 
                  alt="Video Content" 
                  className="w-full h-auto max-h-[512px] object-contain"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Elevate Your Mood Instantly</h3>
              <p className="text-gray-600 mb-6">
                Our curated collection of short videos is designed to help you relax, laugh, and feel inspired. Perfect for when you need a quick mood boost or a moment of joy during a busy day.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Quick Entertainment</h4>
                    <p className="text-sm text-gray-500">Perfect for short breaks or when you need a quick mood lift</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Always Fresh Content</h4>
                    <p className="text-sm text-gray-500">New videos added daily to keep you entertained</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <ThumbsUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Personalized Recommendations</h4>
                    <p className="text-sm text-gray-500">Content tailored to your interests and preferences</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-50 rounded-full"></div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why You'll Love Our Video Shorts</h3>
              
              <ul className="space-y-6">
                <li className="flex">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Play className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Instant Mood Booster</h4>
                    <p className="text-blue-100">
                      Feeling stressed or tired? Our videos are designed to instantly lift your spirits and bring a smile to your face.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Perfect for Short Breaks</h4>
                    <p className="text-blue-100">
                      Whether you have 2 minutes or 20, our short-form videos fit perfectly into your busy schedule.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Share2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Share the Joy</h4>
                    <p className="text-blue-100">
                      Found something you love? Easily share it with friends and family to brighten their day too.
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-blue-500">
                <p className="font-medium">
                  "Our video content is carefully selected to provide moments of joy, inspiration, and relaxation whenever you need them."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
