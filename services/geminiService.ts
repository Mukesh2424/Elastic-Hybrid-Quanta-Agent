
import { GoogleGenAI } from "@google/genai";
import { hybridSearch } from "./elasticService";

// Ensure API_KEY is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Runs a conversational search.
 * 1. Retrieves context using a simulated Elastic hybrid search.
 * 2. Uses the context to generate a response from the Gemini model.
 * @param query The user's query.
 * @returns A conversational string response from the AI.
 */
export const askAI = async (query: string): Promise<string> => {
  // 1. Get context from our simulated ElasticSearch
  const docs = await hybridSearch(query);
  const context = docs.join('\n');

  // 2. Create the prompt for Gemini
  const prompt = `
    You are an intelligent search assistant using Elastic hybrid search + Vertex AI.
    Use the retrieved context to generate a helpful, conversational answer.
    If the context is not sufficient, answer based on your general knowledge but mention that the provided context was limited.

    Context from Elastic Search:
    ---
    ${context}
    ---

    User Query:
    ${query}

    Answer clearly and naturally:
  `;
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return "I'm sorry, but I'm having trouble connecting to the AI service right now. Please try again later.";
  }
};
