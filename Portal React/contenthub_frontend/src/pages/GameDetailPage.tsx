import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

// Types for games
interface Game {
  id: string;
  title: string;
  description: string;
  path: string;
}

// Gradients for games
const gradients = [
  'from-blue-500 to-purple-500',
  'from-green-400 to-blue-500',
  'from-purple-500 to-pink-500',
  'from-yellow-400 to-orange-500',
  'from-pink-500 to-red-500',
  'from-indigo-500 to-blue-500',
  'from-red-500 to-yellow-500',
  'from-teal-400 to-blue-500',
  'from-orange-500 to-red-500',
  'from-blue-400 to-emerald-500',
];

// Function to get gradient by index
const getGradient = (index: number) => {
  return gradients[index % gradients.length];
};

const GameDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  
  // List of all games
  const games: Game[] = [
    {
      id: 'space-adventure',
      title: 'Space Adventure',
      description: 'Control a spaceship, dodge asteroids and battle enemy ships in this exciting space arcade game.',
      path: '/games/space-adventure/index.html'
    },
    {
      id: 'medieval-castle-builder',
      title: 'Medieval Castle Builder',
      description: 'Build and defend your medieval castle against waves of attacking enemies. Gather resources, construct buildings, and survive as long as possible!',
      path: '/games/Medieval-Castle-Builder/index.html'
    },
    {
      id: 'little-mushroom-adventure',
      title: 'Little Mushroom Adventure',
      description: 'Help a little mushroom navigate through an enchanted forest, collecting treasures and avoiding dangers in this cute platform game.',
      path: '/games/Little-Mushroom-Adventure/index.html'
    },
    {
      id: 'fantasy-tower-defense',
      title: 'Fantasy Tower Defense',
      description: 'Defend your kingdom from hordes of monsters by placing magical towers and upgrading them in this strategic tower defense game.',
      path: '/games/Fantasy-Tower-Defense/index.html'
    },
    {
      id: 'enchanted-forest-memory-match',
      title: 'Enchanted Forest: Memory Match',
      description: 'Test your memory by finding pairs of cards with magical creatures and items in this colorful memory game.',
      path: '/games/Enchanted-Forest-Memory-Match/index.html'
    },
    {
      id: 'deep-sea-adventure',
      title: 'Deep Sea Adventure',
      description: 'Dive into the depths of the ocean, controlling a submarine, explore the seabed, collect treasures and avoid dangerous sea creatures.',
      path: '/games/Deep-Sea-Adventure-Game/index.html'
    }
  ];
  
  // Get game data by id
  const game = games.find(game => game.id === id);
  
  // Game loading handler
  useEffect(() => {
    // Simulate game loading
    const timer = setTimeout(() => {
      setIsGameLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Fullscreen mode handler
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  // If game not found
  if (!game) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <p className="text-gray-600 mb-6">The requested game does not exist or has been removed.</p>
          <Link to="/games" className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Games List
          </Link>
        </div>
      </div>
    );
  }

  // Get game index for gradient
  const gameIndex = games.findIndex(g => g.id === id);
  const gradient = getGradient(gameIndex);
  
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="container-custom py-12">
        {/* Back navigation */}
        <div className="mb-8">
          <Link to="/games" className="text-blue-600 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games List
          </Link>
        </div>
        
        {/* Game title with gradient background */}
        <div className={`bg-gradient-to-r ${gradient} rounded-xl shadow-lg p-8 mb-8 text-white`}>
          <h1 className="text-3xl md:text-4xl font-bold font-['Poppins',_sans-serif]">{game.title}</h1>
          <p className="mt-4 text-white/90 text-lg">{game.description}</p>
        </div>

        {/* Game frame */}
        <div id="game-frame">
          <div className={`bg-black rounded-xl overflow-hidden shadow-lg ${isFullscreen ? 'fixed inset-0 z-50' : 'aspect-video'}`}>
            {!isGameLoaded ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg">Loading game...</p>
              </div>
            ) : (
              <>
                <div className="relative">
                  <iframe 
                    src={game.path} 
                    className="w-full h-full"
                    style={{ height: isFullscreen ? '100vh' : '600px' }}
                    title={game.title}
                    allowFullScreen
                  ></iframe>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
