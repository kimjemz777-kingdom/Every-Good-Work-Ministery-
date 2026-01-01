import React from 'react';
import { useSiteConfig } from '../contexts/SiteContext';
import { Heart, CreditCard, ShieldCheck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Donate: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <div className="pt-24 pb-12 min-h-screen bg-[#fdfbf7]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
           <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Support Every Good Work</h1>
           <p className="text-gray-600 text-lg">"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." (2 Corinthians 9:7)</p>
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-t-4 border-gold-500 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 via-gold-500 to-primary-500"></div>

            <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Heart size={40} className="fill-current" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Give Securely via Stripe</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
              We have partnered with <strong>Stripe</strong> to process donations securely. Your generous gift helps us serve the little child, the elderly, the sick, and the poor in our community.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 max-w-md mx-auto">
               <h3 className="font-bold text-gray-800 mb-2">Your Donation Supports:</h3>
               <ul className="text-sm text-gray-600 space-y-2 text-left px-4">
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div> Food & Clothing for the Needy</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div> Ministry Operations & Outreach</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div> Support for the Elderly & Sick</li>
               </ul>
            </div>

            {/* Donation Button */}
            <a 
              href={config.donationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-5 bg-[#635BFF] hover:bg-[#5851df] text-white font-bold text-xl rounded-full shadow-lg transition-transform hover:scale-105 group"
            >
               <CreditCard size={24} className="group-hover:rotate-12 transition-transform" />
               Donate Now with Stripe
            </a>
            
            <div className="mt-8 flex flex-col items-center gap-2 text-xs text-gray-400">
               <div className="flex items-center gap-1">
                  <Lock size={12} />
                  <span>Secure 256-bit SSL Encryption</span>
               </div>
               <p>Every Good Work Ministry is a non-profit organization.</p>
            </div>
        </div>

        <div className="mt-12 text-center">
           <Link to="/" className="text-primary-600 hover:text-primary-800 font-medium">
              &larr; Back to Home
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Donate;