import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Users, BookOpen, Mail, MapPin, Facebook, Youtube, Instagram, Settings, Save, Globe, Info, Rocket, Clock, Plus, Trash2, Book, CreditCard, Calendar, CheckCircle, Hand, Mic, Briefcase, Star, Quote, ArrowRight, Shield, Anchor, Sun, MonitorPlay, Video, Search } from 'lucide-react';
import DailyDevotional from './components/DailyDevotional';
import ChatAssistant from './components/ChatAssistant';
import BibleReader from './components/BibleReader';
import ResourceFinder from './components/ResourceFinder';
import MinistryCalendar from './components/MinistryCalendar';
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
  return (
    <div className="pt-24 pb-12 container mx-auto px-4">
       <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">Our Outreach</span>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mt-2">Serving the Broken & The Faithful</h1>
       </div>
       
       <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Children's Ministry", desc: "Raising up the next generation in the way they should go.", icon: <Star className="text-gold-500" size={32} /> },
            { title: "Elderly Care", desc: "Honoring our elders with companionship and practical help.", icon: <Clock className="text-primary-500" size={32} /> },
            { title: "Sick & Shut-In", desc: "Bringing prayer and communion to those who cannot leave their homes.", icon: <Heart className="text-red-500" size={32} /> },
            { title: "The Poor & Needy", desc: "Providing food, clothing, and resources for those in financial crisis.", icon: <Hand className="text-green-500" size={32} /> },
            { title: "Disability Support", desc: "Ensuring accessibility and inclusion for the lame and weak.", icon: <Shield className="text-blue-500" size={32} /> },
          ].map((m, i) => (
             <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all flex gap-6">
                <div className="shrink-0 bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center">
                   {m.icon}
                </div>
                <div>
                   <h3 className="font-bold text-xl text-gray-900 mb-2">{m.title}</h3>
                   <p className="text-gray-600">{m.desc}</p>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

const InviteUs = () => {
  return (
    <div className="pt-24 pb-12 container mx-auto px-4">
       <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border-t-4 border-gold-500">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 text-center">Request Ministry Services</h1>
          <p className="text-gray-600 mb-8 text-center">
             We are here to serve. If you know of a need in the community, let us know.
          </p>
          <form className="space-y-4">
             <div className="grid md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
                   <input className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Contact Phone</label>
                   <input className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Service Type Needed</label>
                <select className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary-500">
                   <option>Hospital Visit</option>
                   <option>Food Assistance</option>
                   <option>Prayer Meeting</option>
                   <option>Home Repair / Help</option>
                   <option>Counseling</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Details</label>
                <textarea rows={4} className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary-500"></textarea>
             </div>
             <button className="w-full py-3 bg-primary-900 text-white font-bold rounded-lg hover:bg-primary-800 transition-colors">
                Submit Request
             </button>
          </form>
       </div>
    </div>
  );
};

const Contact = () => {
  const { config } = useSiteConfig();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Prayer Request: ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nPrayer Request:\n${formData.message}`;
    window.location.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-12 container mx-auto px-4">
       <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side: Contact Info */}
          <div>
             <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">Contact & Prayer</h1>
             <p className="text-gray-600 text-lg mb-8">
                "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." - Philippians 4:6
             </p>
             <p className="text-gray-600 mb-8">
                We believe in the power of prayer. Send us your request, and our ministry team will stand in agreement with you.
             </p>
             
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-primary-100 text-primary-600 rounded-lg"><Mail /></div>
                   <div>
                      <h4 className="font-bold text-gray-900">Email Us</h4>
                      <p className="text-gray-600">{config.email}</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-gold-100 text-gold-600 rounded-lg"><MapPin /></div>
                   <div>
                      <h4 className="font-bold text-gray-900">Location</h4>
                      <p className="text-gray-600">{config.address}</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-gold-500">
             <h2 className="text-2xl font-bold font-serif text-gray-900 mb-6">Send a Prayer Request</h2>
             {submitted ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-xl text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">Request Prepared</h3>
                    <p>We've opened your email client to send this request to {config.email}.</p>
                    <button onClick={() => setSubmitted(false)} className="text-sm underline mt-4">Send another</button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
                        <input required name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gold-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gold-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">How can we pray for you?</label>
                        <textarea required name="message" value={formData.message} onChange={handleChange} placeholder="Please pray for..." rows={5} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gold-500"></textarea>
                    </div>
                    <button type="submit" className="w-full px-8 py-3 bg-gold-500 text-black font-bold rounded-lg hover:bg-gold-400 transition-colors shadow-md flex items-center justify-center gap-2">
                        <Hand size={20} /> Send Prayer Request
                    </button>
                </form>
             )}
          </div>
       </div>
    </div>
  );
};

const JoinUs = () => {
  return (
    <div className="pt-24 pb-12 container mx-auto px-4 text-center">
       <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">Join Our Family</h1>
       <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          We believe church is more than a building—it's a family. We'd love to help you get connected.
       </p>
       <div className="bg-white max-w-md mx-auto p-8 rounded-2xl shadow-xl border border-gray-100">
          <form className="space-y-4">
             <input placeholder="Your Name" className="w-full p-3 bg-gray-50 border rounded-lg" />
             <input placeholder="Email Address" className="w-full p-3 bg-gray-50 border rounded-lg" />
             <input placeholder="Phone Number" className="w-full p-3 bg-gray-50 border rounded-lg" />
             <button className="w-full py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700">I'm Interested</button>
          </form>
       </div>
    </div>
  );
};

const AdminDashboard = () => (
   <div className="pt-24 pb-12 container mx-auto px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-500">Restricted Access. Please log in.</p>
   </div>
);

const NotFound = () => (
   <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found.</p>
      <Link to="/" className="px-6 py-2 bg-primary-600 text-white rounded-full">Go Home</Link>
   </div>
);

const Footer = () => {
  const { config } = useSiteConfig();
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-gold-400">
                <Heart size={16} className="fill-current" />
              </div>
              <span className="font-serif font-bold text-lg">{config.ministryName}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Serving the community and spreading the Word of God to the ends of the earth.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-gold-400">About Us</Link></li>
              <li><Link to="/ministries" className="hover:text-gold-400">Ministries</Link></li>
              <li><Link to="/resources" className="hover:text-gold-400">Community Resources</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400">Contact</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-4">Connect</h4>
             <div className="flex gap-4">
                <a href={config.facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook size={20} /></a>
                <a href={config.youtubeUrl} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"><Youtube size={20} /></a>
                <a href={config.instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"><Instagram size={20} /></a>
                <a href={config.tiktokUrl} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-black transition-colors border border-white/10"><TikTokIcon size={20} /></a>
             </div>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-4">Support</h4>
             <p className="text-gray-400 text-sm mb-4">Your giving changes lives.</p>
             <a href={config.donationUrl} target="_blank" rel="noreferrer" className="inline-block px-6 py-2 bg-gold-500 text-black font-bold rounded-full hover:bg-gold-400 transition-colors text-sm">
               Give Online
             </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
           <p>&copy; {new Date().getFullYear()} {config.ministryName}. All rights reserved.</p>
           <div className="flex gap-4">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
           </div>
        </div>
      </div>
    </footer>
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
          <div className="hidden xl:flex items-center space-x-6">
            <Link to="/" className={`${isActive('/')} transition-colors`}>Home</Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors`}>Who We Are</Link>
            <Link to="/bible" className={`${isActive('/bible')} transition-colors flex items-center gap-1`}>
              <Book size={16} /> Bible
            </Link>
            <Link to="/resources" className={`${isActive('/resources')} transition-colors flex items-center gap-1`}>
              <Search size={16} /> Help Resources
            </Link>
            <Link to="/calendar" className={`${isActive('/calendar')} transition-colors flex items-center gap-1`}>
              <Calendar size={16} /> Calendar
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
          </div>

           {/* Mobile Button */}
           <button className="xl:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="flex flex-col p-4 space-y-4">
            <Link onClick={() => setIsOpen(false)} to="/" className="p-2 hover:bg-gray-50 rounded-lg">Home</Link>
            <Link onClick={() => setIsOpen(false)} to="/about" className="p-2 hover:bg-gray-50 rounded-lg">Who We Are</Link>
            <Link onClick={() => setIsOpen(false)} to="/bible" className="p-2 hover:bg-gray-50 rounded-lg font-bold text-primary-600">Read Bible</Link>
            <Link onClick={() => setIsOpen(false)} to="/resources" className="p-2 hover:bg-gray-50 rounded-lg">Resource Finder</Link>
            <Link onClick={() => setIsOpen(false)} to="/calendar" className="p-2 hover:bg-gray-50 rounded-lg">Calendar</Link>
            <Link onClick={() => setIsOpen(false)} to="/ministries" className="p-2 hover:bg-gray-50 rounded-lg">Ministries</Link>
            <Link onClick={() => setIsOpen(false)} to="/invite" className="p-2 hover:bg-gray-50 rounded-lg">Request Services</Link>
            <Link onClick={() => setIsOpen(false)} to="/contact" className="p-2 hover:bg-gray-50 rounded-lg">Contact</Link>
            <a href={config.donationUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-gold-500 text-black font-bold rounded-lg text-center">Donate</a>
          </div>
        </div>
      )}
    </nav>
  );
};

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
              <Route path="/resources" element={<ResourceFinder />} />
              <Route path="/calendar" element={<MinistryCalendar />} />
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