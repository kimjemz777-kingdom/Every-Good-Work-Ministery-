import React, { useState } from 'react';
import { findCommunityResources } from '../services/geminiService';
import { LocalResource } from '../types';
import { Search, MapPin, Loader2, Heart, Home, DollarSign, Stethoscope, Phone, ClipboardCheck, ExternalLink } from 'lucide-react';

const ResourceFinder: React.FC = () => {
  const [zipState, setZipState] = useState('');
  const [category, setCategory] = useState('Food Pantries');
  const [resources, setResources] = useState<LocalResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const categories = [
    { name: "Food Pantries & Banks", icon: <Heart size={18} /> },
    { name: "Shelter & Housing", icon: <Home size={18} /> },
    { name: "Financial Assistance", icon: <DollarSign size={18} /> },
    { name: "Medical & Health Clinics", icon: <Stethoscope size={18} /> },
    { name: "Crisis Hotlines", icon: <Phone size={18} /> },
    { name: "Employment & Job Training", icon: <BriefcaseIcon size={18} /> },
    { name: "Legal Aid", icon: <ScaleIcon size={18} /> },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipState.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setResources([]);

    try {
      const results = await findCommunityResources(zipState, category);
      setResources(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-[#fdfbf7]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
           <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Community Resource Finder</h1>
           <p className="text-gray-600 max-w-2xl mx-auto text-lg">
             "For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink..." 
             <span className="block text-sm font-bold mt-2 text-primary-600">- Matthew 25:35</span>
           </p>
           <p className="mt-4 text-gray-500">
             Enter your Zip Code and State to find local organizations helping with food, housing, and other needs.
           </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mb-12">
            <form onSubmit={handleSearch} className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">I need help with...</label>
                   <select 
                     value={category} 
                     onChange={(e) => setCategory(e.target.value)}
                     className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 font-medium"
                   >
                     {categories.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                   </select>
                </div>
                <div className="md:col-span-1">
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Location</label>
                   <input 
                     type="text" 
                     placeholder="Zip Code or City, State" 
                     value={zipState}
                     onChange={(e) => setZipState(e.target.value)}
                     className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 font-medium"
                   />
                </div>
                <div className="md:col-span-1 flex items-end">
                   <button 
                     type="submit" 
                     disabled={loading}
                     className="w-full p-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                   >
                     {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                     Find Help
                   </button>
                </div>
            </form>
        </div>

        {/* Government Assistance Link */}
        <div className="bg-green-50 border border-green-100 p-6 md:p-8 rounded-2xl shadow-md mb-12 flex flex-col md:flex-row items-center justify-between gap-8 transform hover:-translate-y-1 transition-transform">
            <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-900 mb-2 flex items-center gap-3">
                    <ClipboardCheck className="text-green-600" size={32} /> 
                    Apply for County Assistance
                </h3>
                <p className="text-green-800 text-lg">
                    Do you need help with <strong>Food Stamps (SNAP)</strong>, <strong>Medicaid</strong>, <strong>Housing</strong>, or <strong>Welfare</strong>?
                </p>
                <p className="text-green-700 mt-2">
                    Click the button to fill out the official government form and see if you qualify for state or county support.
                </p>
            </div>
            <a 
                href="https://www.benefits.gov/benefit-finder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-full shadow-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
                Click Here to See If You Qualify <ExternalLink size={20} />
            </a>
        </div>

        {/* Results */}
        <div>
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
               <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
               <p className="text-gray-500">Searching for resources near you...</p>
            </div>
          )}

          {!loading && hasSearched && resources.length === 0 && (
             <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500">We couldn't find specific details right now. Please try a different location term or call 2-1-1.</p>
             </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((res, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary-500 hover:shadow-lg transition-shadow animate-in slide-in-from-bottom-5 fade-in duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex items-start justify-between mb-3">
                     <h3 className="text-xl font-bold text-gray-900">{res.name}</h3>
                     <div className="bg-primary-50 p-2 rounded-full text-primary-600">
                        <MapPin size={20} />
                     </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{res.description}</p>
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3 text-sm font-medium text-gray-800">
                     <span className="text-primary-600 font-bold">Contact:</span>
                     {res.contact}
                  </div>
              </div>
            ))}
          </div>

          {!hasSearched && (
            <div className="text-center text-gray-400 py-12">
              <p>Enter your information above to see resources.</p>
            </div>
          )}
          
          <div className="mt-12 bg-blue-50 border border-blue-100 p-6 rounded-xl text-center">
             <h4 className="font-bold text-blue-900 mb-2">Need Immediate Help?</h4>
             <p className="text-blue-800 text-sm">
               If you are in an emergency, please dial <strong>911</strong>. 
               For mental health crisis, dial <strong>988</strong> (Suicide & Crisis Lifeline).
               For general community services in the US/Canada, dial <strong>211</strong>.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple icon components for the categories
const BriefcaseIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);
const ScaleIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path></svg>
);

export default ResourceFinder;