import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Users, BookOpen, Mail, MapPin, Facebook, Youtube, Instagram, Settings, Save, Globe, Info, Rocket, Clock, Plus, Trash2 } from 'lucide-react';
import DailyDevotional from './components/DailyDevotional';
import ChatAssistant from './components/ChatAssistant';
import { SiteProvider, useSiteConfig } from './contexts/SiteContext';

// --- Page Components ---

const Home = () => {
  const { config } = useSiteConfig();
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          style={{ backgroundImage: 'url("https://picsum.photos/seed/church/1920/1080")' }} 
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight drop-shadow-lg">
            {config.ministryName}
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide drop-shadow-md opacity-90">
            {config.missionStatement}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/about" className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-full transition-transform hover:scale-105 shadow-lg">
              Our Beliefs
            </Link>
            <Link to="/contact" className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white hover:text-primary-900 font-bold rounded-full transition-all">
              Join Us This Sunday
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome & Devotional Section */}
      <section className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">Welcome Home</span>
          <h2 className="text-4xl font-serif font-bold text-gray-900">
            We are Children of God Through <span className="text-primary-600">Jesus' Blood</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At {config.ministryName}, we stand on the simple, powerful truth of the Bible. 
            We are a non-denominational church committed to fellowship, teaching, and prayer.
            Our mission is to help people understand biblical truths and to guide those in need 
            to the saving grace of Jesus Christ.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Community</h4>
                <p className="text-sm text-gray-500">Fellowship in Christ</p>
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
        </div>
      </section>

      {/* Call to Action Strip */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
           <h2 className="text-3xl font-serif">"Let your light so shine before men..."</h2>
           <p className="text-primary-100 max-w-2xl mx-auto">
             Join us in our mission to bring glory to God. Whether you need prayer, guidance, or a family to belong to, you are welcome here.
           </p>
        </div>
      </section>
    </div>
  );
};

const About = () => {
  const { config } = useSiteConfig();
  return (
    <div className="pt-24 pb-12 container mx-auto px-4 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-900">Who We Are</h1>
        <p className="text-xl text-gray-600">{config.ministryName}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
          <img 
            src="https://picsum.photos/seed/bible/800/600" 
            alt="Bible Study" 
            className="rounded-2xl shadow-xl w-full object-cover h-96"
          />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-serif">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              {config.ministryName} is a non-denominational Christian ministry devoted to sharing the truth of God’s Word through prayer, teaching, guidance, and service. We follow the teachings of Jesus Christ and the Bible, seeking to help individuals and families grow in faith, understanding, and spiritual wholeness.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We exist to serve those in need, to reach those who may feel forgotten or unaware of God’s love, and to provide biblical education and encouragement rooted in compassion, truth, and grace. Through outreach, discipleship, and community support, we aim to help people understand biblical truths and walk in alignment with God’s purpose for their lives.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              All that we do is for the glory of God, through His Son Jesus Christ, who reigns forever.
            </p>
          </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
        <h2 className="text-2xl font-serif font-bold mb-6 text-center">Our Core Beliefs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-primary-700 mb-2">Jesus Christ</h3>
            <p className="text-gray-600 text-sm">We believe Jesus is the Son of God, who died for our sins and rose again, reigning forever.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-primary-700 mb-2">The Bible</h3>
            <p className="text-gray-600 text-sm">We follow the teachings of the Bible as our ultimate authority for life and faith.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-primary-700 mb-2">Salvation</h3>
            <p className="text-gray-600 text-sm">We are children of God through Jesus' blood, saved by grace through faith.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Ministries = () => (
  <div className="pt-24 pb-12 container mx-auto px-4">
    <div className="text-center mb-16">
      <h1 className="text-4xl font-serif font-bold text-primary-900 mb-4">Our Ministries</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        There is a place for everyone to serve and be served. Get involved in the good work.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        { 
          title: "Sunday Worship", 
          icon: <Users className="w-8 h-8 text-white" />,
          desc: "Join us every Sunday for uplifting worship and biblical teaching that changes lives.",
          img: "https://picsum.photos/seed/worship/600/400"
        },
        { 
          title: "Bible Study", 
          icon: <BookOpen className="w-8 h-8 text-white" />,
          desc: "Deep dive into the scriptures every Wednesday. Learn to apply the Bible to daily life.",
          img: "https://picsum.photos/seed/study/600/400"
        },
        { 
          title: "Community Outreach", 
          icon: <Heart className="w-8 h-8 text-white" />,
          desc: "We feed the hungry, clothe the poor, and bring the light of Jesus to our city streets.",
          img: "https://picsum.photos/seed/charity/600/400"
        }
      ].map((m, i) => (
        <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg h-96">
          <img src={m.img} alt={m.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-transparent flex flex-col justify-end p-8">
            <div className="bg-gold-500 w-fit p-3 rounded-xl mb-4 shadow-lg">
              {m.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{m.title}</h3>
            <p className="text-gray-200">{m.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Contact = () => {
    const { config } = useSiteConfig();
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                 {/* Default icons if empty for demo */}
                 {!config.facebookUrl && <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors"><Facebook size={20} /></a>}
             </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-gold-500">
        <h2 className="text-2xl font-serif font-bold mb-6">Send a Prayer Request</h2>
        {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
                <Heart className="w-12 h-12 mx-auto mb-2 text-green-500 fill-current" />
                <h3 className="text-xl font-bold mb-2">Received!</h3>
                <p>We will be praying for you. God is faithful.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-sm underline hover:text-green-900">Send another</button>
            </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How can we pray for you?</label>
            <textarea required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="Share your burden..." />
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
                    <div className="bg-green-100 border border-green-200 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-2 animate-pulse">
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
                        <div className="grid md:grid-cols-3 gap-4">
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
                <p className="text-[10px] uppercase tracking-widest text-primary-600 font-semibold">Ministry</p>
             </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors`}>Home</Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors`}>Who We Are</Link>
            <Link to="/ministries" className={`${isActive('/ministries')} transition-colors`}>Ministries</Link>
            <Link to="/contact" className={`${isActive('/contact')} transition-colors`}>Contact</Link>
            <Link to="/contact" className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-full transition-all text-sm shadow-md">
              Donate
            </Link>
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
            <Link onClick={() => setIsOpen(false)} to="/ministries" className="p-2 hover:bg-gray-50 rounded-lg">Ministries</Link>
            <Link onClick={() => setIsOpen(false)} to="/contact" className="p-2 hover:bg-gray-50 rounded-lg">Contact</Link>
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
          </div>
          <div>
             <h4 className="font-bold mb-4">Quick Links</h4>
             <ul className="space-y-2 text-sm text-gray-400">
               <li><Link to="/" className="hover:text-white">Home</Link></li>
               <li><Link to="/about" className="hover:text-white">About Us</Link></li>
               <li><Link to="/ministries" className="hover:text-white">Ministries</Link></li>
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
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/contact" element={<Contact />} />
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