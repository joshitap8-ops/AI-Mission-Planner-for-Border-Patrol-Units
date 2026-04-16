import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface MissionPlan {
  title: string;
  objective: string;
  strategy: string;
  explanation: string;
  analysis: string;
  threats: { lat: number; lng: number; type: string }[];
  safeZones: { lat: number; lng: number }[];
  route: [number, number][]; // [lat, lng] pairs for Leaflet
  assets: string[];
  successProbability: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  timeline: { phase: string; description: string }[];
}

export async function generateMissionPlan(prompt: string): Promise<MissionPlan> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Act as a high-level military strategic AI for Northern India Defence Sector. 
      Generate a tactical mission plan for the Jammu & Kashmir region based on this objective: ${prompt}. 
      You MUST provide exact numerical coordinates for the map. 
      The region bounds are roughly Latitude [32.0 to 37.0] and Longitude [73.0 to 80.0].
      - Provide a list of 2-4 tactical threats.
      - Provide 2-3 safe zones.
      - Provide a route as an array of [latitude, longitude] pairs (at least 5 points).
      Focus on terrain masking, thermal avoidance, and strategic waypoint navigation. 
      NOTE: All locations and movements generated are for simulation purposes only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            objective: { type: Type.STRING },
            strategy: { type: Type.STRING },
            explanation: { type: Type.STRING },
            analysis: { type: Type.STRING },
            threats: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  lat: { type: Type.NUMBER },
                  lng: { type: Type.NUMBER },
                  type: { type: Type.STRING }
                },
                required: ['lat', 'lng', 'type']
              }
            },
            safeZones: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  lat: { type: Type.NUMBER },
                  lng: { type: Type.NUMBER }
                },
                required: ['lat', 'lng']
              }
            },
            route: {
              type: Type.ARRAY,
              items: {
                type: Type.ARRAY,
                items: { type: Type.NUMBER }
              }
            },
            assets: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            successProbability: { type: Type.STRING },
            riskLevel: { 
              type: Type.STRING,
              enum: ['Low', 'Medium', 'High', 'Critical']
            },
            timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ['phase', 'description']
              }
            }
          },
          required: ['title', 'objective', 'strategy', 'explanation', 'analysis', 'threats', 'safeZones', 'route', 'assets', 'successProbability', 'riskLevel', 'timeline']
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text from AI model");
    }

    try {
      return JSON.parse(text.trim());
    } catch (parseError) {
      console.error("Invalid JSON response from Gemini:", text);
      throw new Error("Strategic AI produced an unreadable mission plan. System malfunction.");
    }

  } catch (error) {
    console.error("FULL ERROR:", error);
    throw error;
  }
}
