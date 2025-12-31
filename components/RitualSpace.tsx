
import React, { useState } from 'react';
import { Ritual } from '../types';

interface RitualSpaceProps {
  ritual: Ritual | null;
  onRefresh: () => void;
}

const RitualSpace: React.FC<RitualSpaceProps> = ({ ritual, onRefresh }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
       <div className="flex justify-between items-center mb-8">
        <h2 className="mythic-font text-3xl text-amber-400">Ritual Space</h2>
        <button 
          onClick={() => {
            setIsRevealed(false);
            onRefresh();
          }}
          className="text-xs uppercase tracking-widest text-amber-500 hover:text-amber-400 flex items-center gap-2"
        >
          <span>🔥</span> New Activation
        </button>
      </div>

      {ritual ? (
        <div className="space-y-12">
          {/* Card Draw Section */}
          <div className="flex flex-col items-center justify-center py-12">
            {!isRevealed ? (
              <button 
                onClick={() => setIsRevealed(true)}
                className="w-56 h-80 glass rounded-2xl border-2 border-amber-500/30 flex flex-col items-center justify-center group cursor-pointer hover:border-amber-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)] transition-all animate-bounce"
              >
                <div className="text-6xl mb-6">🃏</div>
                <span className="mythic-font text-amber-500 tracking-[0.3em] text-sm animate-pulse">DRAW MIRROR</span>
              </button>
            ) : (
              <div className="w-56 h-80 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl p-1 shadow-[0_0_40px_rgba(251,191,36,0.3)] animate-in zoom-in duration-500">
                <div className="w-full h-full bg-slate-900 rounded-[0.9rem] flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-xs mythic-font text-amber-500 uppercase mb-4 tracking-widest">Today's Reflection</span>
                  <div className="text-4xl mb-6">👁️</div>
                  <h3 className="mythic-font text-xl text-white mb-2">{ritual.drawCard}</h3>
                  <div className="w-8 h-1 bg-amber-500/30 mb-4"></div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Mirror Card Alpha</p>
                </div>
              </div>
            )}
          </div>

          {/* Ritual Details */}
          <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
             
             <div className="text-center mb-10">
               <h3 className="mythic-font text-2xl text-amber-200 mb-2">{ritual.name}</h3>
               <p className="text-xs uppercase tracking-[0.3em] text-amber-500/50">Guided Embodiment Practice</p>
             </div>

             <div className="space-y-8 mb-10">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <h4 className="mythic-font text-sm text-amber-500 mb-3 flex items-center gap-2">
                    <span>🧘</span> Instruction
                  </h4>
                  <p className="serif-font text-lg text-slate-300 leading-relaxed italic">
                    {ritual.instruction}
                  </p>
                </div>

                <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 text-center">
                  <h4 className="mythic-font text-xs text-amber-500/50 mb-3 uppercase tracking-widest">Sacred Activation</h4>
                  <p className="mythic-font text-2xl text-amber-100 tracking-tight leading-snug">
                    "{ritual.affirmation}"
                  </p>
                </div>
             </div>

             <div className="flex justify-center">
               <button className="px-10 py-4 bg-transparent border border-amber-500/30 text-amber-500 mythic-font rounded-full hover:bg-amber-500 hover:text-slate-950 transition-all active:scale-95 font-bold tracking-widest">
                 COMPLETE RITUAL
               </button>
             </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RitualSpace;
