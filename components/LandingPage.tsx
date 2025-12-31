
import React from 'react';
import { StarBackground } from '../App';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarBackground count={80} />
      
      {/* Hero Content */}
      <div className="z-10 text-center px-4 max-w-4xl">
        <h1 className="mythic-font text-5xl md:text-8xl mb-4 bg-clip-text text-transparent bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-2xl">
          STARBORN
        </h1>
        <p className="mythic-font text-xl md:text-2xl mb-8 text-amber-100 tracking-[0.3em]">
          The Game of Becoming
        </p>
        
        <div className="glass p-8 rounded-2xl mb-12 border-amber-500/20 shadow-2xl">
          <p className="serif-font text-lg md:text-xl text-slate-300 leading-relaxed italic mb-4">
            "What if your birth chart was your character sheet? Discover your class, your quests, and your constellation."
          </p>
          <p className="text-slate-400 text-sm md:text-base mb-8">
            You are not broken. You are a character becoming. Step into the mythic RPG of self-discovery where the heavens define your unique powers and your life writes the story.
          </p>
          
          <button 
            onClick={onStart}
            className="group relative px-10 py-4 bg-amber-500 text-slate-950 mythic-font font-bold text-lg tracking-widest rounded-full transition-all hover:scale-105 hover:bg-amber-400 gold-glow active:scale-95"
          >
            START YOUR SCROLL
            <span className="absolute -inset-1 rounded-full border border-amber-500/50 animate-pulse group-hover:animate-ping opacity-0 group-hover:opacity-100"></span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            title="The Codex" 
            description="Deep lore on archetypal classes and the mythos of the Spiral." 
            icon="📜"
          />
          <FeatureCard 
            title="Transit Quests" 
            description="Challenges based on the current movement of the heavens." 
            icon="🌀"
          />
          <FeatureCard 
            title="Ritual Space" 
            description="Daily activations to ground your myth in reality." 
            icon="🕯️"
          />
        </div>
      </div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
};

const FeatureCard: React.FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => (
  <div className="glass p-6 rounded-xl border-white/5 transition-transform hover:-translate-y-1">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="mythic-font text-amber-200 mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
