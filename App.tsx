
import React, { useState, useEffect } from 'react';
import { AppState, BirthData, CharacterScroll } from './types';
import LandingPage from './components/LandingPage';
import IntakeForm from './components/IntakeForm';
import Dashboard from './components/Dashboard';
import CharacterScrollDisplay from './components/CharacterScrollDisplay';
import { generateCharacterScroll } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  const [scroll, setScroll] = useState<CharacterScroll | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("Consulting the Heavens...");

  const handleStartJourney = () => {
    setAppState(AppState.INTAKE);
  };

  const handleIntakeSubmit = async (data: BirthData) => {
    setBirthData(data);
    setAppState(AppState.GENERATING);
    
    try {
      setLoadingMessage("Calculating Celestial Alignments...");
      const generatedScroll = await generateCharacterScroll(data);
      setScroll(generatedScroll);
      setAppState(AppState.DASHBOARD);
    } catch (error) {
      console.error("Failed to generate scroll", error);
      alert("The stars are clouded. Please try again later.");
      setAppState(AppState.INTAKE);
    }
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.LANDING:
        return <LandingPage onStart={handleStartJourney} />;
      case AppState.INTAKE:
        return <IntakeForm onSubmit={handleIntakeSubmit} />;
      case AppState.GENERATING:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-950 text-white relative">
            <StarBackground count={100} />
            <div className="z-10 text-center">
              <div className="w-24 h-24 border-t-4 border-amber-400 border-solid rounded-full animate-spin mx-auto mb-8"></div>
              <h2 className="mythic-font text-3xl mb-4 tracking-widest">{loadingMessage}</h2>
              <p className="serif-font italic text-slate-400">"As above, so below. Your myth is being woven."</p>
            </div>
          </div>
        );
      case AppState.DASHBOARD:
        return scroll && birthData ? (
          <Dashboard 
            scroll={scroll} 
            birthData={birthData} 
            onReset={() => setAppState(AppState.LANDING)} 
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-x-hidden">
      {renderContent()}
    </div>
  );
};

export const StarBackground: React.FC<{ count: number }> = ({ count }) => {
  const [stars, setStars] = useState<{ top: string; left: string; size: string; duration: string }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: count }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {stars.map((star, i) => (
        <div 
          key={i} 
          className="star" 
          style={{ 
            top: star.top, 
            left: star.left, 
            width: star.size, 
            height: star.size,
            '--duration': star.duration 
          } as any} 
        />
      ))}
    </div>
  );
};

export default App;
