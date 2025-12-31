
import React, { useState } from 'react';
import { BirthData } from '../types';
import { StarBackground } from '../App';

interface IntakeFormProps {
  onSubmit: (data: BirthData) => void;
}

const IntakeForm: React.FC<IntakeFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BirthData>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthLocation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.birthDate) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <StarBackground count={60} />
      
      <div className="glass w-full max-w-md p-8 rounded-3xl z-10 border-amber-500/10 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center border-4 border-amber-500/30 gold-glow">
          <span className="text-4xl">✨</span>
        </div>
        
        <h2 className="mythic-font text-2xl text-center mb-2 mt-8 text-amber-200">Session 0</h2>
        <p className="text-center text-slate-400 text-sm mb-8 italic">Enter your celestial coordinates to begin.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-amber-500/70 mb-2 mythic-font">Mortal Name</label>
            <input 
              type="text" 
              required
              placeholder="How are you known?"
              className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-600"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-amber-500/70 mb-2 mythic-font">Birth Date</label>
              <input 
                type="date" 
                required
                className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                value={formData.birthDate}
                onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-amber-500/70 mb-2 mythic-font">Birth Time</label>
              <input 
                type="time" 
                required
                className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                value={formData.birthTime}
                onChange={e => setFormData({ ...formData, birthTime: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-amber-500/70 mb-2 mythic-font">Place of Origin</label>
            <input 
              type="text" 
              required
              placeholder="City, Country"
              className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-600"
              value={formData.birthLocation}
              onChange={e => setFormData({ ...formData, birthLocation: e.target.value })}
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold mythic-font tracking-widest rounded-xl hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-amber-900/20"
          >
            CONSULT THE ORACLE
          </button>
        </form>
      </div>
    </div>
  );
};

export default IntakeForm;
