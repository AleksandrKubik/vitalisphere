import React, { useEffect, useState } from 'react';

interface TrackInfoProps {
  title: string;
  isChanging: boolean;
  coverColor?: string;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ 
  title, 
  isChanging,
  coverColor = '#4f46e5'
}) => {
  const [opacity, setOpacity] = useState(1);
  const [displayTitle, setDisplayTitle] = useState(title);
  
  // Effect for animating transitions between tracks
  useEffect(() => {
    if (isChanging) {
      // First make it transparent
      setOpacity(0);
      
      // Then bring it back after a small delay
      const timer = setTimeout(() => {
        setDisplayTitle(title); // Update the displayed title
        setOpacity(1);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      // Make sure title is updated and visible when not changing
      setDisplayTitle(title);
      setOpacity(1);
    }
  }, [isChanging, title]); // Add title to dependencies to react to track changes
  
  // Generate gradient based on color
  const generateGradient = () => {
    const baseColor = coverColor;
    
    // Create a darker version of the color for gradient
    const darkenColor = (hexColor: string): string => {
      // Remove # if it exists
      let color = hexColor.replace('#', '');
      
      // Convert to RGB
      let r = parseInt(color.substr(0, 2), 16);
      let g = parseInt(color.substr(2, 2), 16);
      let b = parseInt(color.substr(4, 2), 16);
      
      // Darken
      r = Math.floor(r * 0.7);
      g = Math.floor(g * 0.7);
      b = Math.floor(b * 0.7);
      
      // Convert back to hex
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };
    
    const darkColor = darkenColor(baseColor);
    
    return `radial-gradient(circle at center, ${baseColor}80, ${darkColor})`;
  };
  
  return (
    <div 
      className="flex flex-col items-center transition-opacity duration-500"
      style={{ opacity }}
      data-title={displayTitle}
      data-is-changing={isChanging}
    >
      {/* Track cover (generated based on color) */}
      <div 
        className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-xl mb-8 flex items-center justify-center relative overflow-hidden"
        style={{ background: generateGradient() }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white/10 to-transparent"></div>
        
        {/* "Vinyl" - black circle inside */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-black/80"></div>
        </div>
        
        {/* Rotation animation for "vinyl" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[12px] border-black/10 animate-spin-slow"></div>
        </div>
      </div>
      
      {/* Track information */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
        {displayTitle}
      </h2>
      
      {/* "Now playing" indicator */}
      <div className="mt-4 flex items-center">
        <div className="flex space-x-1">
          {[1, 2, 3].map((_, i) => (
            <div 
              key={i} 
              className="h-1 w-1 bg-white rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
        <span className="ml-2 text-xs uppercase tracking-wider text-gray-400">
          Now Playing
        </span>
      </div>
    </div>
  );
};

export default TrackInfo;