
import React from 'react';
import { CharacterScroll, BirthData } from '../types';

interface CharacterScrollDisplayProps {
  scroll: CharacterScroll;
  birthData: BirthData;
}

const CharacterScrollDisplay: React.FC<CharacterScrollDisplayProps> = ({ scroll, birthData }) => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-1000">
      {/* Header Profile */}
      <div className="relative text-center mb-12">
        <div className="inline-block relative">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-amber-500/30 bg-slate-900 mx-auto flex items-center justify-center gold-glow mb-6">
             <span className="text-6xl md:text-8xl">⚛️</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-6 py-1 rounded-full mythic-font text-sm font-bold tracking-widest uppercase">
            {scroll.mythicClass}
          </div>
        </div>
        
        <h2 className="mythic-font text-4xl md:text-6xl text-amber-200 mb-2 tracking-tighter">{birthData.name}</h2>
        <p className="mythic-font text-amber-500/70 tracking-[0.4em] text-sm uppercase">{scroll.title}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard label="Sun Archetype" value={scroll.archetypes.sun} icon="☀️" color="text-amber-400" />
        <StatCard label="Moon Archetype" value={scroll.archetypes.moon} icon="🌙" color="text-indigo-400" />
        <StatCard label="Ascendant" value={scroll.archetypes.ascendant} icon="🌅" color="text-orange-400" />
      </div>

      <div className="glass p-8 md:p-12 rounded-[2rem] border-amber-500/10 mb-12 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <span className="text-9xl">📜</span>
        </div>
        
        <section className="mb-10 relative">
          <h3 className="mythic-font text-xl text-amber-500 mb-4 border-b border-amber-500/20 pb-2 flex items-center gap-2">
            <span>✨</span> Core Essence
          </h3>
          <p className="serif-font text-xl text-slate-300 italic leading-relaxed">
            "{scroll.essence}"
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section>
            <h3 className="mythic-font text-xl text-amber-500 mb-4 border-b border-amber-500/20 pb-2">Primary Quests</h3>
            <ul className="space-y-4">
              {scroll.primaryQuests.map((q, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-amber-600 font-bold">0{i+1}.</span>
                  <span className="text-slate-400 text-sm leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </section>
          
          <section>
            <h3 className="mythic-font text-xl text-amber-500 mb-4 border-b border-amber-500/20 pb-2">Shadow Bosses</h3>
            <ul className="space-y-4">
              {scroll.shadowBosses.map((s, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
                  <span className="text-slate-400 text-sm italic">{s}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
        
        <div className="mt-12 p-6 bg-slate-950/40 rounded-2xl border border-white/5 text-center">
          <p className="text-xs mythic-font text-amber-500/40 uppercase tracking-widest mb-2">Resonance Alignment</p>
          <p className="text-slate-300 text-sm italic">"{scroll.resonance}"</p>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; icon: string; color: string }> = ({ label, value, icon, color }) => (
  <div className="glass p-6 rounded-2xl border-white/5 flex flex-col items-center text-center transition-all hover:scale-105 hover:bg-white/10 group">
    <span className={`text-4xl mb-3 group-hover:scale-110 transition-transform ${color}`}>{icon}</span>
    <h4 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1 mythic-font">{label}</h4>
    <p className="text-amber-100 font-bold">{value}</p>
  </div>
);

export default CharacterScrollDisplay;
