import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, Devotional } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing in environment variables.");
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateDailyDevotional = async (): Promise<Devotional> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Generate a short, uplifting daily Christian devotional. Include a title, a key scripture reference (KJV or NIV), and a brief encouraging message (about 50-70 words) focusing on God\'s love, grace, or good works.',
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            scripture: { type: Type.STRING },
            content: { type: Type.STRING }
          },
          required: ["title", "scripture", "content"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    
    return JSON.parse(text) as Devotional;
  } catch (error) {
    console.error("Failed to generate devotional:", error);
    return {
      title: "God's Everlasting Love",
      scripture: "Jeremiah 31:3",
      content: "The Lord has appeared of old to me, saying: 'Yes, I have loved you with an everlasting love; Therefore with lovingkindness I have drawn you.' Rest in the assurance today that you are held by a love that never ends."
    };
  }
};

export const sendChatMessage = async (history: ChatMessage[], newMessage: string, ministryName: string = "Every Good Work Ministry"): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // Construct chat history for context
    const recentHistory = history.slice(-6).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: recentHistory,
      config: {
        systemInstruction: `You are a warm, wise, and biblically grounded assistant for '${ministryName}'. Your name is Grace. You help users understand the Bible, offer prayers, and guide them to Jesus' teachings. You are non-denominational and rely on scripture (KJV, NKJV, or NIV). Keep answers concise, comforting, and doctrinally sound according to the belief that we are children of God through Jesus' blood.`,
      }
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "I apologize, I am unable to answer right now. Peace be with you.";
  } catch (error) {
    console.error("Chat error:", error);
    return "I am having trouble connecting to the server. Please try again later. God bless.";
  }
};