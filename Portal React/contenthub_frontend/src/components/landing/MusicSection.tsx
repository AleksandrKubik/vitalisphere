import React from 'react';
import { Music, Headphones, Radio, Heart, ListMusic } from 'lucide-react';

const MusicSection: React.FC = () => {
  return (
    <section id="music" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Endless Playlist</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in a world of music with our extensive collection of tracks, playlists, and radio stations.
          </p>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pl-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
              {/* Используем предоставленную иллюстрацию */}
              <div className="w-full aspect-square rounded-xl mb-6 flex items-center justify-center">
                <img 
                  src="/landing/music.png" 
                  alt="Music Content" 
                  className="w-full h-auto max-h-[512px] object-contain"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">The Perfect Soundtrack for Every Moment</h3>
              <p className="text-gray-600 mb-6">
                Whether you're working, relaxing, exercising, or hosting a party, our music collection provides the perfect soundtrack for every moment of your life.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Headphones className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Premium Sound Quality</h4>
                    <p className="text-sm text-gray-500">Crystal clear audio for the ultimate listening experience</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Radio className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Curated Radio Stations</h4>
                    <p className="text-sm text-gray-500">Expertly curated stations for every genre and mood</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <ListMusic className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Smart Playlists</h4>
                    <p className="text-sm text-gray-500">Personalized playlists that adapt to your taste</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-50 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-50 rounded-full"></div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why You'll Love Our Music Experience</h3>
              
              <ul className="space-y-6">
                <li className="flex">
                  <div className="bg-purple-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Music className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Endless Variety</h4>
                    <p className="text-purple-100">
                      From chart-topping hits to hidden gems, our vast library covers every genre, era, and mood you can imagine.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-purple-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Mood Enhancement</h4>
                    <p className="text-purple-100">
                      Need to focus? Want to relax? Looking to energize your workout? Our music adapts to your emotional needs.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="bg-purple-500 p-2 rounded-full mr-4 flex-shrink-0">
                    <Headphones className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Seamless Listening</h4>
                    <p className="text-purple-100">
                      Enjoy uninterrupted playback across all your devices, with smart transitions between tracks for a perfect flow.
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-purple-500">
                <p className="font-medium">
                  "Music has the power to transform your mood, enhance your productivity, and bring joy to any moment. Our platform makes that power accessible anytime, anywhere."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
