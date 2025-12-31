import React, { useState, useEffect, useRef } from 'react';
import { fetchBibleChapter, generateBibleAudio } from '../services/geminiService';
import { BibleChapter, BibleVerse } from '../types';
import { ChevronLeft, ChevronRight, Book, Loader2, Globe, Type, RefreshCw, Volume2, Square, Play, Sparkles } from 'lucide-react';

const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", 
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", 
  "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", 
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", 
  "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

const VERSIONS = ["NIV", "KJV", "NKJV", "ESV", "NASB", "NLT", "MSG"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Portuguese", "Chinese", "Korean", "Tagalog"];

// --- Audio Helper Functions ---
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Convert raw PCM Int16 to AudioBuffer
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const BibleReader: React.FC = () => {
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState(1);
  const [version, setVersion] = useState("NIV");
  const [language, setLanguage] = useState("English");
  
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [narrationStyle, setNarrationStyle] = useState<'regular' | 'dramatic'>('dramatic');
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Cleanup audio on unmount
    return () => stopAudio();
  }, []);

  useEffect(() => {
    stopAudio(); // Stop audio if chapter changes
    loadChapter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, chapter, version, language]);

  const loadChapter = async () => {
    setLoading(true);
    setIsStreaming(true);
    setError("");
    setVerses([]); // Clear previous content

    try {
      await fetchBibleChapter(book, chapter, version, language, (updatedVerses) => {
        setVerses(updatedVerses);
        setLoading(false); // Stop showing main spinner once data starts arriving
      });
    } catch (err) {
      setError("Unable to load scripture at this time. Please try again.");
    } finally {
      setLoading(false);
      setIsStreaming(false);
    }
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {
        // ignore if already stopped
      }
      sourceNodeRef.current = null;
    }
    if (audioContextRef.current) {
      // It's often better not to close context if we want to reuse it, but for simple implementation we can close.
      // Or just suspend/close.
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsPlaying(false);
    setIsAudioLoading(false);
  };

  const handlePlayAudio = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }
    
    if (verses.length === 0) return;

    setIsAudioLoading(true);
    
    try {
      // 1. Prepare Text
      const fullText = verses.map(v => v.text).join(' ');
      
      // 2. Fetch Audio (Base64)
      const base64Audio = await generateBibleAudio(fullText, narrationStyle);
      
      // 3. Initialize Audio Context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass({ sampleRate: 24000 }); // Gemini TTS usually outputs 24kHz
      audioContextRef.current = ctx;

      // 4. Decode
      const audioBytes = decodeBase64(base64Audio);
      const audioBuffer = await decodeAudioData(audioBytes, ctx);

      // 5. Play
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => {
        setIsPlaying(false);
      };
      source.start(0);
      
      sourceNodeRef.current = source;
      setIsPlaying(true);

    } catch (err) {
      console.error("Audio playback failed", err);
      alert("Unable to play audio. The chapter might be too long for the audio generator, or there was a network issue.");
    } finally {
      setIsAudioLoading(false);
    }
  };

  const handleNext = () => setChapter(c => c + 1);
  const handlePrev = () => setChapter(c => Math.max(1, c - 1));

  return (
    <div className="pt-24 pb-12 min-h-screen bg-[#fdfbf7]"> {/* Creamy paper background */}
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header & Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-200 mb-8 sticky top-24 z-30">
          <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 w-full xl:w-auto">
              <Book className="text-primary-600" />
              <h1 className="font-serif font-bold text-2xl text-gray-900 hidden md:block">Bible Reader</h1>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap md:flex-nowrap gap-3 w-full xl:w-auto items-center justify-center md:justify-end">
               <select 
                 value={book} 
                 onChange={(e) => { setBook(e.target.value); setChapter(1); }}
                 className="p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-primary-500 flex-1 md:flex-none"
               >
                 {BIBLE_BOOKS.map(b => <option key={b} value={b}>{b}</option>)}
               </select>

               <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 px-3">
                 <span className="text-xs text-gray-500 mr-2">Ch</span>
                 <input 
                   type="number" 
                   min="1" 
                   max="150" 
                   value={chapter} 
                   onChange={(e) => setChapter(parseInt(e.target.value) || 1)}
                   className="w-12 bg-transparent text-sm font-semibold outline-none"
                 />
               </div>

               <select 
                 value={version} 
                 onChange={(e) => setVersion(e.target.value)}
                 className="p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-primary-500 w-20"
               >
                 {VERSIONS.map(v => <option key={v} value={v}>{v}</option>)}
               </select>

               {/* Audio Controls Group */}
               <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                 <select 
                    value={narrationStyle}
                    onChange={(e) => setNarrationStyle(e.target.value as 'regular' | 'dramatic')}
                    className="bg-transparent text-sm font-medium text-gray-600 outline-none px-2 py-1"
                    disabled={isPlaying || isAudioLoading}
                 >
                    <option value="dramatic">Dramatic</option>
                    <option value="regular">Regular</option>
                 </select>
                 
                 <button 
                    onClick={handlePlayAudio}
                    disabled={loading || verses.length === 0}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md font-bold transition-all shadow-sm text-sm ${
                      isPlaying 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                 >
                    {isAudioLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : isPlaying ? (
                      <>
                        <Square size={16} fill="currentColor" /> Stop
                      </>
                    ) : (
                      <>
                        <Volume2 size={16} /> Listen
                      </>
                    )}
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white min-h-[60vh] p-8 md:p-12 rounded-2xl shadow-xl border border-stone-100 relative">
          
          {/* Header Title */}
          {!loading && !error && (
             <div className="text-center mb-8 border-b border-gray-100 pb-6">
                 <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">{book} {chapter}</h2>
                 <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">{version} • {language}</p>
             </div>
          )}

          {loading && verses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-gold-500" />
              <p className="text-gray-400 font-serif italic">Opening the scroll...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
               <p className="text-red-500 mb-4">{error}</p>
               <button onClick={loadChapter} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Try Again</button>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
               <div className="space-y-4 text-lg md:text-xl leading-loose font-serif text-gray-800">
                  {verses.map((v) => (
                    <span key={v.verse} className="inline animate-fade-in">
                      <sup className="text-[10px] font-sans text-primary-400 font-bold mr-1 select-none">{v.verse}</sup>
                      <span className="hover:bg-yellow-50 transition-colors duration-200 cursor-text">{v.text} </span>
                    </span>
                  ))}
                  {isStreaming && (
                     <span className="inline-block w-2 h-4 ml-1 bg-gold-400 animate-pulse"></span>
                  )}
               </div>
               
               {/* Footer Navigation */}
               {!isStreaming && (
                 <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                    <button 
                      onClick={handlePrev} 
                      disabled={chapter <= 1}
                      className="flex items-center gap-2 px-6 py-3 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent font-medium transition-colors"
                    >
                      <ChevronLeft size={20} />
                      Previous
                    </button>
                    <button 
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      Next Chapter
                      <ChevronRight size={20} />
                    </button>
                 </div>
               )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BibleReader;