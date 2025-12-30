import React, { useEffect, useState } from 'react';
import { generateDailyDevotional } from '../services/geminiService';
import { Devotional } from '../types';
import { BookOpen, Loader2 } from 'lucide-react';
import { useSiteConfig } from '../contexts/SiteContext';

const DailyDevotional: React.FC = () => {
  const { config } = useSiteConfig();
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevotional = async () => {
      try {
        const data = await generateDailyDevotional();
        setDevotional(data);
      } catch (err) {
        // Fallback is handled in service, but just in case
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDevotional();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-gold-500">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-4 text-primary-800">
          <BookOpen className="w-6 h-6" />
          <h2 className="text-xl font-bold font-serif uppercase tracking-wider">Verse & Insight of the Moment</h2>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
            <p className="text-gray-400 italic">Seeking wisdom...</p>
          </div>
        ) : devotional ? (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{devotional.title}</h3>
            <blockquote className="border-l-4 border-primary-200 pl-4 py-2 my-4 italic text-gray-700 bg-gray-50 rounded-r-lg">
              "{devotional.scripture}"
            </blockquote>
            <p className="text-gray-600 leading-relaxed text-lg">
              {devotional.content}
            </p>
          </div>
        ) : (
          <p>Unable to load devotional.</p>
        )}
      </div>
      <div className="bg-primary-50 px-8 py-4 flex justify-between items-center">
        <span className="text-xs font-semibold text-primary-800 uppercase tracking-widest">{config.ministryName}</span>
        <span className="text-xs text-gray-500">Powered by AI</span>
      </div>
    </div>
  );
};

export default DailyDevotional;