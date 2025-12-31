
import React, { useState, useEffect } from 'react';
import { CharacterScroll, BirthData, Quest, Ritual } from '../types';
import CharacterScrollDisplay from './CharacterScrollDisplay';
import QuestLog from './QuestLog';
import RitualSpace from './RitualSpace';
import { generateTransitQuest, generateDailyRitual } from '../services/geminiService';
import { StarBackground } from '../App';

interface DashboardProps {
  scroll: CharacterScroll;
  birthData: BirthData;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ scroll, birthData, onReset }) => {
  const [activeTab, setActiveTab] = useState<'scroll' | 'quests' | 'rituals' | 'codex'>('scroll');
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [dailyRitual, setDailyRitual] = useState<Ritual | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const q = await generateTransitQuest(scroll);
      const r = await generateDailyRitual();
      setCurrentQuest(q);
      setDailyRitual(r);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'scroll':
        return <CharacterScrollDisplay scroll={scroll} birthData={birthData} />;
      case 'quests':
        return <QuestLog currentQuest={currentQuest} scroll={scroll} onRefresh={loadInitialData} />;
      case 'rituals':
        return <RitualSpace ritual={dailyRitual} onRefresh={loadInitialData} />;
      case 'codex':
        return <Codex />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <StarBackground count={50} />
      
      {/* Sidebar / Mobile Nav */}
      <nav className="z-20 w-full md:w-64 glass border-r border-amber-500/10 flex flex-col p-6 sticky top-0 h-auto md:h-screen">
        <div className="mb-12 hidden md:block">
          <h1 className="mythic-font text-2xl text-amber-500">STARBORN</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/50">Character Codex</p>
        </div>
        
        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          <NavBtn active={activeTab === 'scroll'} onClick={() => setActiveTab('scroll')} icon="📜" label="The Scroll" />
          <NavBtn active={activeTab === 'quests'} onClick={() => setActiveTab('quests')} icon="🌀" label="Quests" />
          <NavBtn active={activeTab === 'rituals'} onClick={() => setActiveTab('rituals')} icon="🕯️" label="Rituals" />
          <NavBtn active={activeTab === 'codex'} onClick={() => setActiveTab('codex')} icon="🪐" label="The Codex" />
        </div>
        
        <div className="mt-auto hidden md:block">
          <button 
            onClick={onReset}
            className="w-full text-xs text-slate-500 hover:text-amber-500 transition-colors uppercase tracking-widest text-left p-2 border-t border-white/5"
          >
            ← Abandon Journey
          </button>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-12 z-10 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4"></div>
            <p className="mythic-font text-amber-500/50 animate-pulse">Consulting the Star-Charts...</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        )}
      </main>
    </div>
  );
};

const NavBtn: React.FC<{ active: boolean; onClick: () => void; icon: string; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-xl transition-all whitespace-nowrap md:whitespace-normal ${active ? 'bg-amber-500 text-slate-950 shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="mythic-font text-sm font-bold tracking-widest uppercase">{label}</span>
  </button>
);

const Codex: React.FC = () => (
  <div className="glass p-8 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="mythic-font text-3xl mb-6 text-amber-400">The Living Codex</h2>
    <div className="space-y-6 serif-font text-lg text-slate-300">
      <p>The Starborn Universe is not a static map, but a living spiral. Every choice you make rippling through the constellations of your life.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-white/5 rounded-lg">
          <h4 className="mythic-font text-amber-200 mb-2">Soul Families</h4>
          <p className="text-sm">Groups of Starborn who share elemental resonances and modalities. You are never traveling alone.</p>
        </div>
        <div className="p-4 border border-white/5 rounded-lg">
          <h4 className="mythic-font text-amber-200 mb-2">The Spiral</h4>
          <p className="text-sm">The path of growth. We don't just circle; we ascend. Every return to a sign is at a higher frequency.</p>
        </div>
      </div>
      <p>Continue your study in the official <a href="#" className="text-amber-500 underline decoration-amber-500/30">Starborn Hub</a> on Notion for deep lore entries on the 12 Gates and the Shadow Bosses.</p>
    </div>
  </div>
);

export default Dashboard;
