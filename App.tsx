import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Users, BookOpen, Mail, MapPin, Facebook, Youtube, Instagram, Settings, Save, Globe, Info, Rocket, Clock, Plus, Trash2, Book, CreditCard, Calendar, CheckCircle, Hand, Mic, Briefcase, Star, Quote, ArrowRight, Shield, Anchor, Sun, MonitorPlay, Video } from 'lucide-react';
import DailyDevotional from './components/DailyDevotional';
import ChatAssistant from './components/ChatAssistant';
import BibleReader from './components/BibleReader';
import { SiteProvider, useSiteConfig } from './contexts/SiteContext';

// --- Assets ---
// Simple SVG for TikTok since it's not in the version of Lucide we are using
const TikTokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

// --- Page Components ---

const Home = () => {
  const { config } = useSiteConfig();
  const [storyForm, setStoryForm] = useState({ name: '', email: '', message: '' });
  const [storySubmitted, setStorySubmitted] = useState(false);

  const handleStoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStoryForm({ ...storyForm, [e.target.name]: e.target.value });
  };

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Testimony: ${storyForm.name}`;
    const body = `Name: ${storyForm.name}\nEmail: ${storyForm.email}\n\nStory:\n${storyForm.message}`;
    window.location.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStorySubmitted(true);
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-primary-900/90 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-[pulse_20s_ease-in-out_infinite]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop")' }} 
        />
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-8">
          <div className="inline-block border border-gold-400/50 bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full text-gold-400 font-serif italic tracking-wide mb-4 animate-fade-in">
             Est. 2025 • Online Ministry
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight drop-shadow-2xl">
            {config.ministryName}
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide drop-shadow-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
            {config.missionStatement}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a 
              href={config.youtubeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <Youtube size={20} /> Watch Online
            </a>
            <Link to="/join" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/50 hover:bg-white hover:text-primary-900 font-bold rounded-full transition-all shadow-xl">
              Request to Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome & Devotional Section */}
      <section className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div>
            <span className="text-gold-600 font-bold uppercase tracking-widest text-xs">Welcome Online</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-2">
              We serve the <span className="text-primary-600">Little Child</span>, the Elderly, and the Weak
            </h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            At {config.ministryName}, we are a non-denominational Christian church dedicated to the Great Commission. 
            We are here for the community to spread God's Word and watch His kingdom grow. 
            We serve the little child, the elderly, the sick, the poor, the lame, and the weak.
            We believe we are all children of God through Jesus' blood.
          </p>
          
          <div className="flex gap-4">
             <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop" alt="Teacher helping student" className="w-1/2 h-48 object-cover rounded-2xl shadow-lg transform -rotate-2" />
             <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop" alt="Community gathering" className="w-1/2 h-48 object-cover rounded-2xl shadow-lg transform rotate-2 mt-8" />
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                <MonitorPlay size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Online Church</h4>
                <p className="text-sm text-gray-500">Join us on YouTube</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gold-100 text-gold-600 rounded-lg">
                <Heart size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Service</h4>
                <p className="text-sm text-gray-500">Helping those in need</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dynamic Devotional Component */}
        <div className="relative transform hover:-translate-y-2 transition-transform duration-300">
           <DailyDevotional />
           
           {/* Upcoming Event Teaser */}
           <div className="mt-8 bg-gray-900 text-white p-6 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <p className="text-gold-500 font-bold text-xs uppercase mb-1">Coming Up This Sunday</p>
                <h4 className="font-serif text-xl font-bold">Worship & The Word</h4>
                <p className="text-gray-400 text-sm">10:00 AM • YouTube Premiere</p>
              </div>
              <a href={config.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition-colors">
                 <Youtube />
              </a>
           </div>
        </div>
      </section>

      {/* Stories of Hope Section */}
      <section className="bg-primary-50 py-20">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Stories of Hope</h2>
               <p className="text-gray-600 mt-2">Real people. Real change. Real God.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 {
                   name: "Sarah M.",
                   role: "Single Mother",
                   text: "Every Good Work Ministries stepped in when I felt alone. The mentorship program gave my son a father figure and gave me a community of sisters.",
                   img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=200&auto=format&fit=crop"
                 },
                 {
                   name: "David K.",
                   role: "Volunteer",
                   text: "I used to think church was just for Sundays. Serving the homeless here taught me that worship is a lifestyle. I've never felt more alive.",
                   img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                 },
                 {
                   name: "The Robinson Family",
                   role: "Members since 2025",
                   text: "We were looking for a place where our kids would be loved and taught truth. We found a family here that spans generations.",
                   img: "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=200&auto=format&fit=crop"
                 }
               ].map((story, i) => (
                 <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                       <img src={story.img} alt={story.name} className="w-12 h-12 rounded-full object-cover" />
                       <div>
                          <h4 className="font-bold text-gray-900 leading-none">{story.name}</h4>
                          <span className="text-xs text-primary-600 font-medium">{story.role}</span>
                       </div>
                    </div>
                    <p className="text-gray-600 italic leading-relaxed">"{story.text}"</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Share Your Story Section */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
           <div className="bg-white rounded-3xl p-8 md:p-12 border border-gold-200 shadow-2xl flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2 space-y-6">
                 <div className="inline-block p-3 bg-gold-100 rounded-full text-gold-600 mb-2">
                    <Quote size={32} />
                 </div>
                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Interested in Sharing Your Story?</h2>
                 <p className="text-gray-700 text-lg leading-relaxed font-serif italic">
                   "And they overcame him by the blood of the Lamb, and by the word of their testimony..." 
                 </p>
                 <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">- Revelation 12:11</p>
                 <p className="text-gray-600">
                   Your journey of faith could be the encouragement someone else needs today. We invite you to share how God has moved in your life, whether big or small.
                 </p>
              </div>
              
              <div className="md:w-1/2 w-full bg-gray-50 p-8 rounded-2xl shadow-inner border border-gray-100">
                 {storySubmitted ? (
                    <div className="text-center py-10">
                       <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                       <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                       <p className="text-gray-600 mt-2">Your email client has been opened to send your testimony. We look forward to reading it.</p>
                       <button onClick={() => setStorySubmitted(false)} className="mt-6 text-sm text-primary-600 underline hover:text-primary-800">Share another story</button>
                    </div>
                 ) : (
                    <form onSubmit={handleStorySubmit} className="space-y-4">
                       <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Name</label>
                          <input required name="name" value={storyForm.name} onChange={handleStoryChange} className="w-full p-3 bg-white rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500" placeholder="John Doe" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                          <input required type="email" name="email" value={storyForm.email} onChange={handleStoryChange} className="w-full p-3 bg-white rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500" placeholder="john@example.com" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Testimony</label>
                          <textarea required name="message" value={storyForm.message} onChange={handleStoryChange} rows={5} className="w-full p-3 bg-white rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500" placeholder="I want to share how God..."></textarea>
                       </div>
                       <button type="submit" className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2">
                          Share My Story <ArrowRight size={18} />
                       </button>
                    </form>
                 )}
              </div>
           </div>
        </div>
      </section>

      {/* Call to Action Strip */}
      <section className="bg-primary-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
           <h2 className="text-4xl font-serif font-bold">"Let your light so shine before men..."</h2>
           <p className="text-primary-100 max-w-2xl mx-auto text-lg">
             Join us in our mission to bring glory to God. Whether you need prayer, guidance, or a family to belong to, you are welcome here.
           </p>
           <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-full transition-colors shadow-lg">
             Contact Us Today
           </Link>
        </div>
      </section>
    </div>
  );
};

const About = () => {
  const { config } = useSiteConfig();
  return (
    <div className="pt-24 pb-12 container mx-auto px-4 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in">
        <span className="text-primary-600 font-bold tracking-widest uppercase text-sm">About Us</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-900">Who We Are</h1>
        <p className="text-xl text-gray-600">Every Good Work Ministries</p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
             {/* Generic Ministry Image */}
             <img 
                src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop" 
                alt="Holy Bible" 
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
             />
             <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border-l-4 border-gold-500">
                <p className="font-serif italic text-gray-800 text-lg">"Thy word is a lamp unto my feet..."</p>
             </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-serif text-primary-900">Our Mission</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  Every Good Work Ministries started with a simple conviction: that every child is a gift from God and deserves to know their identity in Christ.
                </p>
                <p>
                  We are here to serve the <strong>little child</strong>, the <strong>elderly</strong>, the <strong>sick</strong>, the <strong>poor</strong>, the <strong>lame</strong>, and the <strong>weak</strong>. We believe that true ministry means reaching out to those often forgotten by society.
                </p>
                <p>
                  As a non-denominational ministry, we are here for the entire community to spread God's Word and watch the Great Commission grow. We are not about religious tradition but about a living relationship with Jesus.
                </p>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
                <div className="bg-primary-50 p-4 rounded-lg text-center min-w-[120px]">
                    <span className="block text-2xl font-bold text-primary-600">Est.</span>
                    <span className="text-gray-600 font-serif">2025</span>
                </div>
                <div className="bg-gold-50 p-4 rounded-lg text-center min-w-[120px]">
                     <span className="block text-2xl font-bold text-gold-600">Faith</span>
                     <span className="text-gray-600 font-serif">Based</span>
                </div>
            </div>
          </div>
      </div>

      {/* Core Values Section (Replaces Leadership Grid) */}
      <div className="py-12 bg-gray-50 rounded-3xl p-8 md:p-16">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Our Core Values</h2>
            <p className="text-gray-600 mt-2">The foundation upon which this ministry stands.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-gold-500 text-center space-y-4">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto text-gold-600">
                    <BookOpen size={32} />
                </div>
                <h3 className="font-bold text-xl text-gray-900">Biblical Truth</h3>
                <p className="text-gray-600">
                    We stand firmly on the Word of God as our ultimate authority and guide for life, teaching, and service.
                </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary-500 text-center space-y-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto text-primary-600">
                    <Anchor size={32} />
                </div>
                <h3 className="font-bold text-xl text-gray-900">Unwavering Faith</h3>
                <p className="text-gray-600">
                    We walk by faith, trusting in God's provision and timing, knowing that He is faithful to complete every good work.
                </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-gold-500 text-center space-y-4">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto text-gold-600">
                    <Sun size={32} />
                </div>
                <h3 className="font-bold text-xl text-gray-900">Active Service</h3>
                <p className="text-gray-600">
                    We are dedicated to serving the community—especially the poor, the sick, and the weak—showing the love of Jesus through tangible acts of kindness.
                </p>
            </div>
        </div>
      </div>

      {/* Donation CTA */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-800 text-white rounded-3xl p-8 md:p-16 text-center space-y-8 shadow-2xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold relative z-10">Invest in a Stronger Future</h2>
          <p className="text-primary-100 max-w-3xl mx-auto leading-relaxed text-lg relative z-10">
            Your donation helps provide the support that changes trajectories before crisis sets in. It helps a child gain confidence, a family find stability, and a community move toward lasting hope.
          </p>
          <div className="pt-4 relative z-10">
            <a 
              href={config.donationUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-black font-bold rounded-full hover:bg-gold-400 transition-all shadow-lg hover:shadow-gold-500/20"
            >
              Support Our Mission <Heart size={20} className="fill-black" />
            </a>
          </div>
      </div>
    </div>
  );
};

const Ministries = () => {
  const { config } = useSiteConfig();
  const [volData, setVolData] = useState({ name: '', email: '', phone: '', interest: 'General Help', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleVolChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setVolData({ ...volData, [e.target.name]: e.target.value });
  };

  const handleVolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Volunteer Interest: ${volData.name}`;
    const body = `Name: ${volData.name}\nEmail: ${volData.email}\nPhone: ${volData.phone}\nArea of Interest: ${volData.interest}\n\nMessage:\n${volData.message}`;
    window.location.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-12 container mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-primary-900 mb-4">Our Ministries</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We operate primarily online, bringing the word of God directly to you. We also deploy teams for community outreach upon request.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {/* Sunday Worship - Links to YouTube */}
        <a href={config.youtubeUrl} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-2xl shadow-lg h-96 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1543249960-d556d601f4f6?q=80&w=2000&auto=format&fit=crop" alt="Sunday Worship" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent flex flex-col justify-end p-8">
              <div className="bg-red-600 w-fit p-3 rounded-xl mb-4 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Sunday Worship Online</h3>
              <p className="text-gray-200 opacity-90">Click to watch our latest service on YouTube.</p>
            </div>
        </a>

        {/* Youth & Education - Links to Request Form */}
        <Link to="/invite" className="group relative overflow-hidden rounded-2xl shadow-lg h-96 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop" alt="Youth" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent flex flex-col justify-end p-8">
              <div className="bg-gold-500 w-fit p-3 rounded-xl mb-4 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Youth & Education</h3>
              <p className="text-gray-200 opacity-90">Request our team to support your youth or education needs.</p>
            </div>
        </Link>

        {/* Community Outreach - Links to Request Form */}
        <Link to="/invite" className="group relative overflow-hidden rounded-2xl shadow-lg h-96 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop" alt="Outreach" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent flex flex-col justify-end p-8">
              <div className="bg-gold-500 w-fit p-3 rounded-xl mb-4 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Community Outreach</h3>
              <p className="text-gray-200 opacity-90">Invite us to partner with you in serving the community.</p>
            </div>
        </Link>
      </div>

      {/* Volunteer Section */}
      <div className="bg-primary-50 rounded-3xl p-8 md:p-12 border border-primary-100 overflow-hidden relative" id="volunteer">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
             <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-primary-700 font-bold text-sm shadow-sm">
                <Hand size={18} /> Get Involved
             </div>
             <h2 className="text-4xl font-serif font-bold text-gray-900">Serve With Us</h2>
             <p className="text-lg text-gray-600">
               God has given each of us unique gifts. Use yours to make a difference. We have opportunities in various areas and would love to have you on the team.
             </p>
             <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                   <Mic className="text-gold-500" /> Worship & Media Team
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                   <Users className="text-gold-500" /> Greeters & Ushers
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                   <Heart className="text-gold-500" /> Community Outreach
                </div>
             </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
             <h3 className="text-xl font-bold mb-6 text-gray-900">Volunteer Interest Form</h3>
             {submitted ? (
                <div className="bg-green-50 p-6 rounded-lg text-center text-green-800">
                   <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-600" />
                   <p className="font-bold">Thank you for your heart to serve!</p>
                   <p className="text-sm mt-2">We have opened your email client to send your interest form.</p>
                   <button onClick={() => setSubmitted(false)} className="text-xs underline mt-4">Reset Form</button>
                </div>
             ) : (
                <form onSubmit={handleVolSubmit} className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                         <input required name="name" value={volData.name} onChange={handleVolChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500" />
                      </div>
                      <div>
                         <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                         <input name="phone" value={volData.phone} onChange={handleVolChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500" />
                      </div>
                   </div>
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                      <input required type="email" name="email" value={volData.email} onChange={handleVolChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500" />
                   </div>
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Area of Interest</label>
                      <select name="interest" value={volData.interest} onChange={handleVolChange} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500">
                         <option>General Help</option>
                         <option>Worship / Music</option>
                         <option>Tech / Media</option>
                         <option>Children's Ministry</option>
                         <option>Outreach / Food Pantry</option>
                         <option>Greeters / Hospitality</option>
                      </select>
                   </div>
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Message (Optional)</label>
                      <textarea name="message" value={volData.message} onChange={handleVolChange} rows={2} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500"></textarea>
                   </div>
                   <button type="submit" className="w-full py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors">
                      Send Interest
                   </button>
                </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InviteUs = () => {
    const { config } = useSiteConfig();
    const [formData, setFormData] = useState({ 
        orgName: '', 
        contactPerson: '', 
        email: '', 
        phone: '',
        date: '',
        eventType: 'Community Outreach',
        location: '',
        details: '' 
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Service Request: ${formData.eventType}`;
        const body = `Organization/Requester: ${formData.orgName}\nContact Person: ${formData.contactPerson}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nService Needed: ${formData.eventType}\nRequested Date: ${formData.date}\nLocation: ${formData.location}\n\nHow we can support you (Details):\n${formData.details}`;
        window.location.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSubmitted(true);
    };

    return (
        <div className="pt-24 pb-12 container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-700 rounded-full mb-4">
                        <Hand size={24} />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-primary-900 mb-4">How Can We Support You?</h1>
                    <p className="text-xl text-gray-600">
                        Request our team for community outreach, youth education, or ministry support. We are here to serve you.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-primary-900 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Star size={120} />
                        </div>
                        <h2 className="text-2xl font-serif font-bold flex items-center gap-2 relative z-10">
                            Service Request Form
                        </h2>
                        <p className="text-primary-200 mt-2 relative z-10">Let us know how our efforts can support your community or organization.</p>
                    </div>
                    
                    <div className="p-8 md:p-12">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Initiated</h3>
                                <p className="text-gray-600 mb-6">We have prepared an email with your request details. Please click "Send" in your email client to complete the process.</p>
                                <button onClick={() => setSubmitted(false)} className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50">Send New Request</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Organization / Name</label>
                                        <input required name="orgName" value={formData.orgName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="Your Name or Org Name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Contact Person</label>
                                        <input required name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="Who should we ask for?" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="email@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                        <input name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="(555) 123-4567" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Service Needed</label>
                                        <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500">
                                            <option>Community Outreach</option>
                                            <option>Youth & Education Support</option>
                                            <option>Guest Preaching</option>
                                            <option>Worship Leading</option>
                                            <option>Conference / Retreat</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Requested Date (Optional)</label>
                                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Location / Address</label>
                                    <input required name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="Where do you need us?" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">How can our efforts support you?</label>
                                    <textarea name="details" value={formData.details} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" placeholder="Tell us about the needs of your community, youth group, or event."></textarea>
                                </div>

                                <button type="submit" className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                                    <Mail size={20} /> Request Ministry Support
                                </button>
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    Submitting this form will open your default email client addressed to {config.email}.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const JoinUs = () => {
  const { config } = useSiteConfig();
  const [formData, setFormData] = useState({ name: '', email: '', date: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Visit Request: ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nRequested Date: ${formData.date || 'Undecided'}\n\nReason for visit/Message:\n${formData.message}`;
    window.location.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-12 container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-4">Request a Visit</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We are primarily an <strong>Online Church</strong>. In-person visits are available <strong>by request only</strong>.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Info Section */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="text-gold-500" /> Online Services
              </h3>
              <p className="text-gray-600 mb-4">Join us weekly on YouTube from the comfort of your home.</p>
              <ul className="space-y-4">
                {config.serviceTimes.map((st, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                    <div>
                      <span className="font-bold text-primary-800 block">{st.day}</span>
                      <span className="text-sm text-gray-500">{st.label}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{st.time}</span>
                  </li>
                ))}
              </ul>
              <a href={config.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block mt-6 text-center w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
                Go to YouTube Channel
              </a>
           </div>

           <div className="bg-primary-50 p-8 rounded-2xl border border-primary-100">
             <h3 className="text-xl font-bold text-primary-900 mb-4">In-Person Visit Policy</h3>
             <ul className="space-y-3">
               <li className="flex items-start gap-3 text-gray-700">
                   <Info size={18} className="text-primary-500 mt-1 shrink-0" /> 
                   <span><strong>By Appointment Only:</strong> We do not have open office hours. All visits must be requested and confirmed in advance.</span>
               </li>
               <li className="flex items-start gap-3 text-gray-700">
                   <Info size={18} className="text-primary-500 mt-1 shrink-0" /> 
                   <span><strong>Location:</strong> Our base is in Aston, PA. Specific directions will be provided upon confirmation.</span>
               </li>
             </ul>
           </div>
        </div>

        {/* Form Section */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-t-8 border-gold-500 h-fit">
           <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Request an Appointment</h2>
           <p className="text-gray-600 mb-8">Please fill out this form if you wish to travel to us for specific ministry needs.</p>
           
           {submitted ? (
              <div className="bg-green-50 text-green-800 p-8 rounded-xl text-center">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-green-600" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Request Started</h3>
                 <p className="mb-4">Your email client has been opened to finalize your request.</p>
                 <button onClick={() => setSubmitted(false)} className="text-sm underline hover:text-green-900">Start Over</button>
              </div>
           ) : (
             <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                   <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Jane Doe" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                   <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="jane@example.com" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Date</label>
                   <input name="date" value={formData.date} onChange={handleChange} type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                   <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="I would like to speak with a chaplain about..." />
                </div>
                <button type="submit" className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                   <Mail size={20} />
                   Request Appointment
                </button>
             </form>
           )}
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
    const { config } = useSiteConfig();
    const [submitted, setSubmitted] = React.useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Construct email link
        const subject = `Prayer Request from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email || 'Not provided'}\n\nPrayer Request:\n${formData.message}`;
        
        // Open default mail client
        window.location.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        setSubmitted(true);
    }

    return (
  <div className="pt-24 pb-12 container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary-900 mb-4">Contact Us & Prayer Requests</h1>
          <p className="text-gray-600">
            We would love to hear from you. Whether you have a question or need prayer, we are here.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 text-gray-700">
            <div className="bg-primary-100 p-3 rounded-full text-primary-600">
              <MapPin size={24} />
            </div>
            <div>
              <p className="font-bold">Based In</p>
              <p>{config.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <div className="bg-primary-100 p-3 rounded-full text-primary-600">
              <Mail size={24} />
            </div>
            <div>
              <p className="font-bold">Email Us</p>
              <p>{config.email}</p>
            </div>
          </div>
        </div>

        <div className="pt-8">
             <h3 className="text-xl font-bold mb-4">Connect Socially</h3>
             <div className="flex gap-4">
                 {config.facebookUrl && config.facebookUrl !== '#' && <a href={config.facebookUrl} target="_blank" rel="noreferrer" className="p-3 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors"><Facebook size={20} /></a>}
                 {config.youtubeUrl && config.youtubeUrl !== '#' && <a href={config.youtubeUrl} target="_blank" rel="noreferrer" className="p-3 bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition-colors"><Youtube size={20} /></a>}
                 {config.instagramUrl && config.instagramUrl !== '#' && <a href={config.instagramUrl} target="_blank" rel="noreferrer" className="p-3 bg-gray-100 rounded-full hover:bg-pink-600 hover:text-white transition-colors"><Instagram size={20} /></a>}
                 {config.tiktokUrl && <a href={config.tiktokUrl} target="_blank" rel="noreferrer" className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors"><TikTokIcon size={20} /></a>}
             </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-gold-500">
        <h2 className="text-2xl font-serif font-bold mb-6">Send a Prayer Request</h2>
        {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
                <Heart className="w-12 h-12 mx-auto mb-2 text-green-500 fill-current" />
                <h3 className="text-xl font-bold mb-2">Prepared!</h3>
                <p className="mb-4">Your email client has been opened to send this request to {config.email}.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-sm underline hover:text-green-900">Send another</button>
            </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input 
              required 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" 
              placeholder="John Doe" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" 
              placeholder="john@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How can we pray for you?</label>
            <textarea 
              required 
              rows={4} 
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" 
              placeholder="Share your burden..." 
            />
          </div>
          <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-colors shadow-md">
            Submit Request
          </button>
        </form>
        )}
      </div>
    </div>
  </div>
)};

const AdminDashboard = () => {
    const { config, updateConfig } = useSiteConfig();
    const [localConfig, setLocalConfig] = useState(config);
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateConfig(localConfig);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalConfig({ ...localConfig, [e.target.name]: e.target.value });
    };

    const handleServiceChange = (index: number, field: string, value: string) => {
      const newTimes = [...localConfig.serviceTimes];
      newTimes[index] = { ...newTimes[index], [field]: value };
      setLocalConfig({ ...localConfig, serviceTimes: newTimes });
    };

    const addServiceTime = () => {
      setLocalConfig({
        ...localConfig,
        serviceTimes: [...localConfig.serviceTimes, { day: "Sunday", time: "9:00 AM", label: "New Service" }]
      });
    };

    const removeServiceTime = (index: number) => {
      const newTimes = localConfig.serviceTimes.filter((_, i) => i !== index);
      setLocalConfig({ ...localConfig, serviceTimes: newTimes });
    };

    return (
        <div className="pt-24 pb-12 container mx-auto px-4 max-w-4xl">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                    <Settings className="w-8 h-8 text-gray-700" />
                    <div>
                        <h1 className="text-2xl font-bold font-serif text-gray-900">Website Configuration</h1>
                        <p className="text-sm text-gray-500">Manage your ministry content and deployment settings.</p>
                    </div>
                </div>

                {/* LAUNCH GUIDE */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-xl">
                  <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-2 text-lg">
                    <Rocket size={20} />
                    How to Launch Your Website
                  </h3>
                  <p className="text-sm text-blue-800 mb-4">
                    If you are visiting <strong>{config.domain || 'your domain'}</strong> and seeing an "Under Construction" or "Parked" page, it means this code has not been uploaded to the internet yet.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                    <h4 className="font-bold text-gray-800 mb-2 text-sm">Follow these steps to go live:</h4>
                    <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-2">
                      <li><strong>Export Code:</strong> Download this project code.</li>
                      <li><strong>Choose a Host:</strong> Create a free account on <a href="https://www.netlify.com" target="_blank" className="text-blue-600 underline">Netlify</a> or <a href="https://vercel.com" target="_blank" className="text-blue-600 underline">Vercel</a>.</li>
                      <li><strong>Upload:</strong> Drag and drop your build folder to the host.</li>
                      <li><strong>Connect Domain:</strong> In the host's settings, add your custom domain ({config.domain}).</li>
                      <li><strong>Update DNS:</strong> Log in to where you bought your domain (e.g., GoDaddy) and update the DNS records provided by Netlify/Vercel.</li>
                    </ol>
                    <p className="text-xs text-gray-500 mt-3 italic">
                      Note: Simply typing your domain name below does not register it or host the site. It only updates the text displayed on the pages.
                    </p>
                  </div>
                </div>

                {saved && (
                    <div className="bg-green-100 border border-green-200 text-green-700 p-6 rounded-lg mb-6 flex items-center gap-2 animate-pulse">
                         <Globe className="w-5 h-5" />
                         <span>Settings saved! Remember to re-deploy your site for these changes to appear online.</span>
                    </div>
                )}

                <form onSubmit={handleSave} className="space-y-8">
                    {/* General Info */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 border-b pb-2">General Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ministry Name</label>
                                <input name="ministryName" value={localConfig.ministryName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Domain URL</label>
                                <input name="domain" value={localConfig.domain} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement (Hero Text)</label>
                            <textarea name="missionStatement" value={localConfig.missionStatement} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" rows={2} />
                        </div>
                    </div>

                    {/* Donation Info */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                           <CreditCard size={18} /> Donations
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Donation Link (GiveButter/PayPal/etc)</label>
                            <input name="donationUrl" value={localConfig.donationUrl} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="https://..." />
                        </div>
                    </div>
                    
                    {/* Service Times */}
                    <div className="space-y-4">
                       <div className="flex justify-between items-end border-b pb-2">
                          <h3 className="font-bold text-gray-900">Service Times</h3>
                          <button type="button" onClick={addServiceTime} className="text-xs flex items-center gap-1 text-primary-600 font-bold hover:text-primary-800">
                             <Plus size={16} /> Add Time
                          </button>
                       </div>
                       <div className="space-y-3">
                          {localConfig.serviceTimes.map((st, idx) => (
                             <div key={idx} className="flex gap-2 items-center">
                                <input 
                                  value={st.day} 
                                  onChange={(e) => handleServiceChange(idx, 'day', e.target.value)} 
                                  className="w-1/4 px-3 py-2 text-sm border border-gray-300 rounded-lg" 
                                  placeholder="Day"
                                />
                                <input 
                                  value={st.time} 
                                  onChange={(e) => handleServiceChange(idx, 'time', e.target.value)} 
                                  className="w-1/4 px-3 py-2 text-sm border border-gray-300 rounded-lg" 
                                  placeholder="Time"
                                />
                                <input 
                                  value={st.label} 
                                  onChange={(e) => handleServiceChange(idx, 'label', e.target.value)} 
                                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg" 
                                  placeholder="Description"
                                />
                                <button type="button" onClick={() => removeServiceTime(idx)} className="p-2 text-red-400 hover:text-red-600">
                                   <Trash2 size={18} />
                                </button>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 border-b pb-2">Contact Details</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                                <input name="email" value={localConfig.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address/Location</label>
                                <input name="address" value={localConfig.address} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 border-b pb-2">Social Media Links</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Facebook URL</label>
                                <input name="facebookUrl" value={localConfig.facebookUrl} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="https://facebook.com/..." />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">YouTube URL</label>
                                <input name="youtubeUrl" value={localConfig.youtubeUrl} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="https://youtube.com/..." />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Instagram URL</label>
                                <input name="instagramUrl" value={localConfig.instagramUrl} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="https://instagram.com/..." />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">TikTok URL</label>
                                <input name="tiktokUrl" value={localConfig.tiktokUrl} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="https://tiktok.com/..." />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t flex items-center justify-between sticky bottom-0 bg-white pb-4">
                        <p className="text-xs text-gray-500">Changes are saved to your local browser instantly.</p>
                        <button type="submit" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md">
                            <Save size={20} />
                            Save Configuration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Navbar = () => {
  const { config } = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-primary-600 font-bold' : 'text-gray-600 hover:text-primary-600';

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
             <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center text-gold-400 group-hover:rotate-12 transition-transform">
                <Heart className="fill-current" />
             </div>
             <div>
                <h1 className="font-serif font-bold text-xl leading-none text-gray-900">{config.ministryName}</h1>
                <p className="text-[10px] uppercase tracking-widest text-primary-600 font-semibold">Online Ministry</p>
             </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors`}>Home</Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors`}>Who We Are</Link>
            <Link to="/bible" className={`${isActive('/bible')} transition-colors flex items-center gap-1`}>
              <Book size={16} /> Bible
            </Link>
            <Link to="/ministries" className={`${isActive('/ministries')} transition-colors`}>Ministries</Link>
            <Link to="/invite" className={`${isActive('/invite')} transition-colors`}>Request Services</Link>
            <Link to="/contact" className={`${isActive('/contact')} transition-colors`}>Contact</Link>
            <a 
              href={config.donationUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-full transition-all text-sm shadow-md flex items-center gap-2"
            >
              Donate <Heart size={16} className="fill-black" />
            </a>
            {/* Social Icons Mini */}
            <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
               {config.youtubeUrl && <a href={config.youtubeUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-600"><Youtube size={18} /></a>}
               {config.tiktokUrl && <a href={config.tiktokUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black"><TikTokIcon size={16} /></a>}
            </div>
          </div>

          {/* Mobile Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="flex flex-col p-4 space-y-4">
            <Link onClick={() => setIsOpen(false)} to="/" className="p-2 hover:bg-gray-50 rounded-lg">Home</Link>
            <Link onClick={() => setIsOpen(false)} to="/about" className="p-2 hover:bg-gray-50 rounded-lg">Who We Are</Link>
            <Link onClick={() => setIsOpen(false)} to="/bible" className="p-2 hover:bg-gray-50 rounded-lg font-bold text-primary-600">Read Bible</Link>
            <Link onClick={() => setIsOpen(false)} to="/ministries" className="p-2 hover:bg-gray-50 rounded-lg">Ministries</Link>
            <Link onClick={() => setIsOpen(false)} to="/invite" className="p-2 hover:bg-gray-50 rounded-lg">Request Services</Link>
            <Link onClick={() => setIsOpen(false)} to="/contact" className="p-2 hover:bg-gray-50 rounded-lg">Contact</Link>
            <a href={config.donationUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-gold-500 text-black font-bold rounded-lg text-center">Donate</a>
            <div className="flex justify-center gap-4 pt-4 border-t border-gray-100">
               <a href={config.youtubeUrl} target="_blank" rel="noreferrer" className="text-red-600"><Youtube /></a>
               <a href={config.tiktokUrl} target="_blank" rel="noreferrer" className="text-black"><TikTokIcon size={24} /></a>
               <a href={config.facebookUrl} target="_blank" rel="noreferrer" className="text-blue-600"><Facebook /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { config } = useSiteConfig();
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
       <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-xl text-gold-500">{config.ministryName}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              All for the glory to God because His Son reigns forever and ever.
            </p>
            <div className="flex gap-4 pt-2">
                 {config.facebookUrl && config.facebookUrl !== '#' && <a href={config.facebookUrl} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors"><Facebook size={18} /></a>}
                 {config.youtubeUrl && config.youtubeUrl !== '#' && <a href={config.youtubeUrl} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-red-600 hover:text-white transition-colors"><Youtube size={18} /></a>}
                 {config.instagramUrl && config.instagramUrl !== '#' && <a href={config.instagramUrl} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 hover:text-white transition-colors"><Instagram size={18} /></a>}
                 {config.tiktokUrl && <a href={config.tiktokUrl} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-black hover:text-white transition-colors"><TikTokIcon size={18} /></a>}
            </div>
          </div>
          <div>
             <h4 className="font-bold mb-4">Quick Links</h4>
             <ul className="space-y-2 text-sm text-gray-400">
               <li><Link to="/" className="hover:text-white">Home</Link></li>
               <li><Link to="/about" className="hover:text-white">About Us</Link></li>
               <li><Link to="/bible" className="hover:text-white">Read Bible</Link></li>
               <li><Link to="/ministries" className="hover:text-white">Ministries</Link></li>
               <li><Link to="/invite" className="hover:text-white">Request Services</Link></li>
               <li><Link to="/contact" className="hover:text-white">Prayer Request</Link></li>
               {/* Admin Link Hidden in plain sight */}
               <li><Link to="/admin" className="hover:text-gray-200 text-gray-800">Admin</Link></li>
             </ul>
          </div>
          <div>
             <h4 className="font-bold mb-4">Service Times</h4>
             <ul className="space-y-2 text-sm text-gray-400">
               {config.serviceTimes.map((st, i) => (
                 <li key={i} className="flex justify-between">
                    <span>{st.day}</span>
                    <span className="text-gold-500">{st.time}</span>
                 </li>
               ))}
             </ul>
          </div>
          <div>
             <h4 className="font-bold mb-4">Subscribe</h4>
             <div className="flex">
               <input type="email" placeholder="Email address" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg outline-none w-full text-sm" />
               <button className="bg-gold-500 text-black px-4 py-2 rounded-r-lg font-bold hover:bg-gold-400">OK</button>
             </div>
          </div>
       </div>
       <div className="container mx-auto px-4 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} {config.ministryName}. {config.domain ? `Visit us at ${config.domain}` : 'All rights reserved.'}
       </div>
    </footer>
  );
};

const NotFound = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">We couldn't find the page you were looking for. Please return home.</p>
        <Link to="/" className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">Back to Home</Link>
    </div>
);

const App: React.FC = () => {
  return (
    <SiteProvider>
      <Router>
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/bible" element={<BibleReader />} />
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/invite" element={<InviteUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/join" element={<JoinUs />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ChatAssistant />
        </div>
      </Router>
    </SiteProvider>
  );
};

export default App;