import React from 'react';
import { Gamepad2, Zap, Trophy, Smile, Users } from 'lucide-react';

const GamesSection: React.FC = () => {
  return (
    <section id="games" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">HTML5 Games for Relaxation and Entertainment</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a break and enjoy our collection of fun, engaging HTML5 games designed to provide entertainment and relaxation.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
              {/* Используем предоставленную иллюстрацию */}
              <div className="w-full aspect-square rounded-xl mb-6 flex items-center justify-center">
                <img 
                  src="/landing/game.png" 
                  alt="Game Content" 
                  className="w-full h-auto max-h-[512px] object-contain"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Play Anywhere, Anytime</h3>
              <p className="text-gray-600 mb-6">
                Our HTML5 games are designed to work seamlessly across all your devices, allowing you to enjoy moments of fun and relaxation wherever you are.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                    <Zap className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Instant Play</h4>
                    <p className="text-sm text-gray-500">No downloads or installations required</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                    <Smile className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Stress Relief</h4>
                    <p className="text-sm text-gray-500">Fun games designed to help you unwind and relax</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                    <Trophy className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Achievements and Leaderboards</h4>
                    <p className="text-sm text-gray-500">Track your progress and compete with friends</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-50 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-red-50 rounded-full"></div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-red-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why You'll Love Our Games</h3>
              
              <ul className="space-y-6">
                <li className="flex">
                  <div className="bg-red-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Gamepad2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Diverse Game Collection</h4>
                    <p className="text-red-100">
                      From puzzles and strategy games to action and adventure, our diverse collection ensures there's something for everyone.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-red-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Smile className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Mental Refreshment</h4>
                    <p className="text-red-100">
                      Take a break from your routine and refresh your mind with engaging gameplay that stimulates different cognitive skills.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-red-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Social Gaming</h4>
                    <p className="text-red-100">
                      Connect with friends, challenge them to beat your high scores, or team up for multiplayer adventures.
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-red-500">
                <p className="font-medium">
                  "Our games are designed to provide moments of joy, challenge, and relaxation in your day. Whether you have five minutes or an hour, there's always time for a quick game."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
