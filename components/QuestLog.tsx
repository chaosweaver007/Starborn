
import React from 'react';
import { Quest, CharacterScroll } from '../types';

interface QuestLogProps {
  currentQuest: Quest | null;
  scroll: CharacterScroll;
  onRefresh: () => void;
}

const QuestLog: React.FC<QuestLogProps> = ({ currentQuest, scroll, onRefresh }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex justify-between items-center mb-8">
        <h2 className="mythic-font text-3xl text-amber-400">Quest Log</h2>
        <button 
          onClick={onRefresh}
          className="text-xs uppercase tracking-widest text-amber-500 hover:text-amber-400 flex items-center gap-2"
        >
          <span>🌀</span> Align Transits
        </button>
      </div>

      {currentQuest ? (
        <div className="space-y-8">
          {/* Main Active Quest */}
          <div className="glass p-8 rounded-[2rem] border-amber-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <span className="text-[12rem] mythic-font">⚔️</span>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-[10px] mythic-font text-amber-500 uppercase tracking-widest">Active Objective</span>
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-[10px] mythic-font text-purple-500 uppercase tracking-widest">{currentQuest.transitInfluence}</span>
              </div>
              
              <h3 className="mythic-font text-3xl text-amber-200 mb-4">{currentQuest.title}</h3>
              <p className="serif-font text-lg text-slate-300 leading-relaxed mb-8">
                {currentQuest.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-amber-500 text-slate-950 mythic-font font-bold text-sm tracking-widest rounded-lg hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-amber-900/20">
                  ACCEPT QUEST
                </button>
                <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-slate-300 mythic-font font-bold text-sm tracking-widest rounded-lg transition-all active:scale-95">
                  MARK AS COMPLETE
                </button>
              </div>
            </div>
          </div>

          {/* Previous/Secondary Quests Mockup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scroll.primaryQuests.map((pq, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl border-white/5 opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3 mb-2">
                   <span className="text-lg">🗝️</span>
                   <h4 className="mythic-font text-amber-200 text-sm">Long-term Objective 0{idx+1}</h4>
                </div>
                <p className="text-slate-400 text-sm italic">{pq}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl border-dashed border-white/10">
          <p className="mythic-font text-slate-500">No active quests found. Refresh the star-charts above.</p>
        </div>
      )}
    </div>
  );
};

export default QuestLog;
