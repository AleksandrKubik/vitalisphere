import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface MusicTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const MusicTabs = ({ tabs, activeTab, onTabChange }: MusicTabsProps) => {
  return (
    <div className="mb-6">
      <div className="flex overflow-x-auto pb-2 space-x-2 no-scrollbar">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MusicTabs;