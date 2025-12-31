
export interface BirthData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
}

export interface CharacterScroll {
  mythicClass: string;
  title: string;
  archetypes: {
    sun: string;
    moon: string;
    ascendant: string;
  };
  essence: string;
  primaryQuests: string[];
  shadowBosses: string[];
  resonance: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'failed';
  transitInfluence: string;
}

export interface Ritual {
  id: string;
  name: string;
  instruction: string;
  affirmation: string;
  drawCard?: string;
}

export enum AppState {
  LANDING = 'LANDING',
  INTAKE = 'INTAKE',
  GENERATING = 'GENERATING',
  DASHBOARD = 'DASHBOARD'
}
