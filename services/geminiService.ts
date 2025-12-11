import { GoogleGenAI, Chat } from "@google/genai";
import { PRODUCTS } from "../constants";

let chatSession: Chat | null = null;

const formatProductContext = () => {
  return PRODUCTS.map(p => `- ${p.name} (${p.category}): $${p.price}. ${p.description}`).join('\n');
};

const SYSTEM_INSTRUCTION = `You are "Eva", the premier AI Jewelry Stylist for the luxury brand Nevara. 
Your tone is elegant, helpful, sophisticated, and warm.
You help customers find the perfect jewelry based on their occasion, style preferences, or gift recipient.
You have access to the following product catalog:
${formatProductContext()}

Rules:
1. Only recommend products from the Nevara catalog above.
2. If asked about prices, provide the exact price from the catalog.
3. Keep responses concise (under 80 words) but inviting, unless the user asks for a detailed story.
4. If the user asks for something we don't have, politely suggest a similar category or the "Custom Design" service (fictional).
5. Do not make up products not in the list.
`;

export const getGeminiChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7, 
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getGeminiChat();
    const result = await chat.sendMessage({ message });
    return result.text || "I apologize, I'm having a moment of silence. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently unable to access my styling notes. Please try again later.";
  }
};
