
import { GoogleGenAI, Type } from "@google/genai";
import { BirthData, CharacterScroll, Quest, Ritual } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function generateCharacterScroll(data: BirthData): Promise<CharacterScroll> {
  const prompt = `
    Given the following birth data for a player in a mythic astrology-based RPG:
    Name: ${data.name}
    Birth Date: ${data.birthDate}
    Birth Time: ${data.birthTime}
    Birth Location: ${data.birthLocation}

    Your task: Interpret their astrological archetypes into a Mythic RPG Character Scroll. 
    1. Create a "Mythic Class" name (e.g., 'Dreamer of Lightning', 'Herald of Silent Echoes').
    2. Assign a mythic Title.
    3. Identify Sun, Moon, and Ascendant signs and interpret them as RPG traits.
    4. Describe their 'Core Essence'.
    5. List 3 'Primary Quests' (narrative goals).
    6. List 2 'Shadow Bosses' (psychological or spiritual obstacles).
    7. Provide a 'Resonance' summary.

    Be poetic, mythic, and immersive. Use "You" throughout.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          mythicClass: { type: Type.STRING },
          title: { type: Type.STRING },
          archetypes: {
            type: Type.OBJECT,
            properties: {
              sun: { type: Type.STRING },
              moon: { type: Type.STRING },
              ascendant: { type: Type.STRING }
            },
            required: ["sun", "moon", "ascendant"]
          },
          essence: { type: Type.STRING },
          primaryQuests: { type: Type.ARRAY, items: { type: Type.STRING } },
          shadowBosses: { type: Type.ARRAY, items: { type: Type.STRING } },
          resonance: { type: Type.STRING }
        },
        required: ["mythicClass", "title", "archetypes", "essence", "primaryQuests", "shadowBosses", "resonance"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generateTransitQuest(scroll: CharacterScroll): Promise<Quest> {
  const prompt = `
    Based on this character's mythic profile: ${scroll.mythicClass}, ${scroll.title}.
    Generate a current 'Transit Quest'. Frame it as an RPG objective.
    Include a title, a description (using cosmic terminology like Gates, Retrogrades, or Conjunctions), and the transit influence.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          transitInfluence: { type: Type.STRING }
        },
        required: ["title", "description", "transitInfluence"]
      }
    }
  });

  const data = JSON.parse(response.text);
  return {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    status: 'active'
  };
}

export async function generateDailyRitual(): Promise<Ritual> {
  const prompt = `
    Generate a mythic ritual for "Starborn" seekers.
    Include a unique name, a step-by-step instruction, a core affirmation, and draw a "Mythic Mirror Card" title.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          instruction: { type: Type.STRING },
          affirmation: { type: Type.STRING },
          drawCard: { type: Type.STRING }
        },
        required: ["name", "instruction", "affirmation", "drawCard"]
      }
    }
  });

  return {
    ...JSON.parse(response.text),
    id: Math.random().toString(36).substr(2, 9)
  };
}
