
import { GoogleGenAI, Type } from '@google/genai';
import { GeneratedItinerary } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully, but for this context, an error is fine.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateItinerary = async (prompt: string): Promise<GeneratedItinerary | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a travel itinerary based on this request: "${prompt}".`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A creative and fitting title for the itinerary, like 'A Culinary Weekend in Paris'.",
            },
            itinerary: {
              type: Type.ARRAY,
              description: 'An array of events making up the itinerary.',
              items: {
                type: Type.OBJECT,
                properties: {
                  day: {
                    type: Type.INTEGER,
                    description: 'The day number of the event (e.g., 1, 2, 3).',
                  },
                  time: {
                    type: Type.STRING,
                    description: "The suggested time for the activity, e.g., '9:00 AM' or 'Evening'.",
                  },
                  activity: {
                    type: Type.STRING,
                    description: 'The name of the activity or event, e.g., "Visit the Louvre Museum".',
                  },
                  description: {
                    type: Type.STRING,
                    description: 'A brief, engaging one-sentence description of the activity.',
                  },
                },
                required: ['day', 'time', 'activity', 'description'],
              },
            },
          },
          required: ['title', 'itinerary'],
        },
      },
    });

    // The response text should be a JSON string matching the schema.
    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as GeneratedItinerary;

  } catch (error) {
    console.error('Error generating itinerary:', error);
    // In a real app, you might want to throw a more user-friendly error
    throw new Error('Failed to generate itinerary. Please try again.');
  }
};
