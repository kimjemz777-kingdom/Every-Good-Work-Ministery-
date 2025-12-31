import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, Devotional, BibleChapter, BibleVerse } from '../types';

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

export const generateBibleAudio = async (text: string, style: 'dramatic' | 'regular' = 'regular'): Promise<string> => {
  try {
    const ai = getAiClient();
    
    let promptPrefix = "";
    let voiceName = "Puck"; // Default

    if (style === 'dramatic') {
       promptPrefix = "Read the following Bible passage with a wise, calm, stern, and engaging narrative voice. Do not read the intro, just the scripture: ";
       voiceName = "Fenrir";
    } else {
       promptPrefix = "Read the following Bible passage clearly, calmly, and at a natural reading pace. Do not read the intro, just the scripture: ";
       voiceName = "Puck";
    }

    const prompt = `${promptPrefix}\n\n"${text}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
        },
      },
    });

    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!audioData) {
        throw new Error("No audio data generated");
    }
    return audioData;
  } catch (error) {
    console.error("Failed to generate audio:", error);
    throw error;
  }
};

// Simple in-memory cache to store fetched chapters
const bibleCache: Map<string, BibleChapter> = new Map();

export const fetchBibleChapter = async (
  book: string, 
  chapter: number, 
  version: string, 
  language: string, 
  onVerseUpdate?: (verses: BibleVerse[]) => void
): Promise<BibleChapter> => {
  
  const cacheKey = `${book}:${chapter}:${version}:${language}`;
  
  // Return cached version immediately if available
  if (bibleCache.has(cacheKey)) {
    const cached = bibleCache.get(cacheKey)!;
    if (onVerseUpdate) onVerseUpdate(cached.verses);
    return cached;
  }

  try {
    const ai = getAiClient();
    // Prompt optimized for streaming and speed
    const prompt = `You are a Bible API helper.
    Task: Output the full text of the Bible chapter: ${book} ${chapter} in ${version} version (${language}).
    Format: Plain text. Each verse on a new line. Format: "VerseNumber|VerseText".
    Example:
    1|In the beginning God created the heavens and the earth.
    2|Now the earth was formless and empty...
    
    Constraints:
    - Do not output Markdown or JSON.
    - Do not include headers like "Here is the text".
    - Strictly follow the "Number|Text" format for every verse.
    - Ensure all verses in the chapter are included.`;

    const streamResult = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    const verses: BibleVerse[] = [];
    let buffer = '';

    for await (const chunk of streamResult) {
      const text = chunk.text;
      if (text) {
        buffer += text;
        const lines = buffer.split('\n');
        
        // Process all complete lines
        // We keep the last part in the buffer because it might be an incomplete line
        buffer = lines.pop() || '';

        let addedNew = false;
        for (const line of lines) {
          if (line.trim() && line.includes('|')) {
             // Split only on the first pipe
             const splitIndex = line.indexOf('|');
             const numPart = line.substring(0, splitIndex);
             const textPart = line.substring(splitIndex + 1);

             const verseNum = parseInt(numPart.trim());
             const verseText = textPart.trim();
             
             if (!isNaN(verseNum) && verseText) {
                verses.push({ verse: verseNum, text: verseText });
                addedNew = true;
             }
          }
        }
        
        if (addedNew && onVerseUpdate) {
            onVerseUpdate([...verses]);
        }
      }
    }

    // Process any remaining buffer
    if (buffer.trim() && buffer.includes('|')) {
         const splitIndex = buffer.indexOf('|');
         const numPart = buffer.substring(0, splitIndex);
         const textPart = buffer.substring(splitIndex + 1);
         const verseNum = parseInt(numPart.trim());
         const verseText = textPart.trim();
         if (!isNaN(verseNum) && verseText) {
            verses.push({ verse: verseNum, text: verseText });
         }
    }
    
    if (onVerseUpdate) onVerseUpdate([...verses]);

    const finalChapter: BibleChapter = {
        reference: `${book} ${chapter}`,
        version,
        language,
        verses
    };
    
    bibleCache.set(cacheKey, finalChapter);
    return finalChapter;

  } catch (error) {
    console.error("Failed to fetch bible chapter:", error);
    throw error;
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