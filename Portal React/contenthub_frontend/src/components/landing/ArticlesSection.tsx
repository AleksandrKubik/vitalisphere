import React from 'react';
import { BookOpen, BookMarked, Coffee, Brain, Lightbulb } from 'lucide-react';

const ArticlesSection: React.FC = () => {
  return (
    <section id="articles" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Deep Articles on Various Topics</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expand your knowledge with our collection of thought-provoking articles written by experts across diverse fields.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
              {/* Используем предоставленную иллюстрацию */}
              <div className="w-full aspect-square rounded-xl mb-6 flex items-center justify-center">
                <img 
                  src="/landing/article.png" 
                  alt="Article Content" 
                  className="w-full h-auto max-h-[512px] object-contain"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Knowledge at Your Fingertips</h3>
              <p className="text-gray-600 mb-6">
                Our articles are crafted to provide deep insights, fresh perspectives, and valuable information that enriches your understanding of the world around you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <BookMarked className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Expert Authors</h4>
                    <p className="text-sm text-gray-500">Articles written by leading experts and thought leaders</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Brain className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Diverse Topics</h4>
                    <p className="text-sm text-gray-500">From science and technology to arts and culture</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Lightbulb className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Thought-Provoking Insights</h4>
                    <p className="text-sm text-gray-500">Expand your perspective and challenge your thinking</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-green-50 rounded-full"></div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-green-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why You'll Love Our Articles</h3>
              
              <ul className="space-y-6">
                <li className="flex">
                  <div className="bg-green-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Coffee className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Engaging Reading Experience</h4>
                    <p className="text-green-100">
                      Our articles are designed for comfortable reading, with beautiful typography and a clean, distraction-free interface.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-green-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Mental Stimulation</h4>
                    <p className="text-green-100">
                      Expand your knowledge, challenge your assumptions, and discover new ideas that stimulate your intellectual curiosity.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-green-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <BookMarked className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Save and Revisit</h4>
                    <p className="text-green-100">
                      Bookmark articles to build your personal knowledge library, accessible anytime for reference or further exploration.
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-green-500">
                <p className="font-medium">
                  "Our articles are designed to be both informative and engaging, providing you with valuable insights that you can apply to your life, work, and understanding of the world."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
