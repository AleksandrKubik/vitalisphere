import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

// Types for games
interface Game {
  id: string;
  title: string;
  description: string;
  path: string;
}

// Gradients for game cards
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

const GamesPage = () => {
  // Real games from public/games directory
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

  // Function to get gradient by index
  const getGradient = (index: number) => {
    return gradients[index % gradients.length];
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-['Poppins',_sans-serif] mb-2">HTML5 Games</h1>
            <p className="text-gray-600">
              A collection of entertaining games for quick fun anytime
            </p>
          </div>
        </div>
      </div>

      {/* Games list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <Link 
            key={game.id} 
            to={`/games/${game.id}`}
            className="group"
          >
            <div className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col bg-gradient-to-br ${getGradient(index)}`}>
              <div className="p-6 flex flex-col flex-grow text-white">
                <h2 className="text-xl font-bold mb-3 group-hover:underline">
                  {game.title}
                </h2>
                
                <p className="text-white/90 flex-grow mb-4">
                  {game.description}
                </p>
                
                <div className="mt-auto flex justify-end">
                  <span className="inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white">
                    Play Now
                    <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* If no results */}
      {games.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Gamepad2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Games Found</h3>
          <p className="text-gray-500">
            Games are currently unavailable. Please check back later.
          </p>
        </div>
      )}
      
      {/* Load more button */}
      {games.length > 0 && (
        <div className="mt-10 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default GamesPage;
