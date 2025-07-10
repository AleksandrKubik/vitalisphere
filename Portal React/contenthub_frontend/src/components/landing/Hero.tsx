import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Music, BookOpen, GraduationCap, Gamepad2, ArrowRight } from 'lucide-react';

// Добавляем стили для анимаций парения
const floatingAnimationStyles = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes float-medium {
    0%, 100% { transform: translateY(0px) rotate(6deg); }
    50% { transform: translateY(-15px) rotate(7deg); }
  }
  
  @keyframes float-fast {
    0%, 100% { transform: translateY(0px) rotate(-3deg); }
    50% { transform: translateY(-8px) rotate(-4deg); }
  }
  
  .float-slow {
    animation: float-slow 6s ease-in-out infinite;
  }
  
  .float-medium {
    animation: float-medium 5s ease-in-out infinite;
  }
  
  .float-fast {
    animation: float-fast 4s ease-in-out infinite;
  }
`;

const Hero: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-900 text-white">
      {/* Вставляем стили для анимаций */}
      <style>{floatingAnimationStyles}</style>
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/backgrounds/noise.png')] opacity-5"></div>
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-5/12 space-y-8">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-sm text-indigo-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>All-new content platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-200">
              Experience All Content <br />
              <span className="relative">
                In One Place
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C20 2.5 80 1 199 5.5" stroke="url(#gradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Unlock unlimited videos, music, articles, courses, and games — all with a single subscription designed for the modern digital lifestyle.
            </p>
            
            <div className="flex flex-wrap gap-6 py-2">
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 p-0.5 shadow-lg shadow-blue-900/30 group-hover:shadow-blue-900/50 transition-all">
                  <div className="w-full h-full rounded-[10px] bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
                    <Play className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors">Video</span>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 p-0.5 shadow-lg shadow-purple-900/30 group-hover:shadow-purple-900/50 transition-all">
                  <div className="w-full h-full rounded-[10px] bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
                    <Music className="h-5 w-5 text-purple-400 group-hover:text-purple-300" />
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors">Music</span>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 shadow-lg shadow-emerald-900/30 group-hover:shadow-emerald-900/50 transition-all">
                  <div className="w-full h-full rounded-[10px] bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
                    <BookOpen className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300" />
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors">Articles</span>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-900/30 group-hover:shadow-amber-900/50 transition-all">
                  <div className="w-full h-full rounded-[10px] bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
                    <GraduationCap className="h-5 w-5 text-amber-400 group-hover:text-amber-300" />
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors">Courses</span>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 p-0.5 shadow-lg shadow-rose-900/30 group-hover:shadow-rose-900/50 transition-all">
                  <div className="w-full h-full rounded-[10px] bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
                    <Gamepad2 className="h-5 w-5 text-rose-400 group-hover:text-rose-300" />
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors">Games</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-indigo-900/30 hover:shadow-indigo-900/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link 
                to="/pricing" 
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-800/60 backdrop-blur-sm border border-slate-700 text-slate-200 font-medium rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-300 hover:border-slate-600"
              >
                View Plans
              </Link>
            </div>
            
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                <img 
                  src="/avatars/user-1.jpg" 
                  alt="User" 
                  className="w-8 h-8 rounded-full border-2 border-slate-900"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://ui-avatars.com/api/?name=User+1&background=6366f1&color=fff`;
                  }}
                />
                <img 
                  src="/avatars/user-2.jpg" 
                  alt="User" 
                  className="w-8 h-8 rounded-full border-2 border-slate-900"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://ui-avatars.com/api/?name=User+2&background=8b5cf6&color=fff`;
                  }}
                />
                <img 
                  src="/avatars/user-3.jpg" 
                  alt="User" 
                  className="w-8 h-8 rounded-full border-2 border-slate-900"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://ui-avatars.com/api/?name=User+3&background=3b82f6&color=fff`;
                  }}
                />
              </div>
              <div className="text-sm text-slate-400">
                <span className="text-white font-medium">10K+</span> happy subscribers
              </div>
            </div>
          </div>
          
          <div className="lg:w-7/12">
            <div className="relative">
              {/* Featured content card - добавляем класс float-slow */}
              <div className="relative z-20 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl float-slow">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1200&auto=format&fit=crop"
                    alt="ContentHubMedia Preview"
                    className="w-full h-full object-cover opacity-90"
                  />
                  
                  {/* Content info overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex items-center justify-center">
                    {/* Content info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <div className="px-3 py-1 bg-indigo-600/80 backdrop-blur-sm rounded-full text-xs font-medium">
                            FEATURED
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-xs text-emerald-400">LIVE NOW</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-1">The Future of Digital Entertainment</h3>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                          <span>42:38</span>
                          <span>•</span>
                          <span>4K</span>
                          <span>•</span>
                          <span>Premium</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 right-12 w-40 h-24 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 rotate-6 blur-xl opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-xl"></div>
              
              {/* Floating mini cards - добавляем класс float-medium */}
              <div className="absolute top-12 -right-10 w-40 bg-slate-800/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-slate-700/50 rotate-6 scale-75 sm:scale-100 z-10 hidden sm:block float-medium">
                <img 
                  src="/content/music-card.jpg" 
                  alt="Music Content" 
                  className="w-full h-24 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=300&auto=format&fit=crop';
                  }}
                />
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Music className="h-4 w-4 text-purple-400" />
                    <span className="text-xs text-purple-400">TOP ALBUM</span>
                  </div>
                  <h4 className="text-sm font-medium truncate">Cosmic Echoes</h4>
                </div>
              </div>
              
              {/* Добавляем класс float-fast */}
              <div className="absolute -bottom-6 -left-6 w-44 bg-slate-800/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-slate-700/50 -rotate-3 scale-75 sm:scale-100 z-10 hidden sm:block float-fast">
                <img 
                  src="/content/course-card.jpg" 
                  alt="Course Content" 
                  className="w-full h-28 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=300&auto=format&fit=crop';
                  }}
                />
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-amber-400" />
                    <span className="text-xs text-amber-400">COURSE</span>
                  </div>
                  <h4 className="text-sm font-medium truncate">Digital Creation Mastery</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;