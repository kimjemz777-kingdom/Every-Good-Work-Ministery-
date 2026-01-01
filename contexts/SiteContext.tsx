import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface ServiceTime {
  day: string;
  time: string;
  label: string;
}

export interface SiteConfig {
  ministryName: string;
  domain: string;
  email: string;
  address: string;
  facebookUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  missionStatement: string;
  donationUrl: string;
  serviceTimes: ServiceTime[];
}

const defaultConfig: SiteConfig = {
  ministryName: "Every Good Work Ministry",
  domain: "everygoodworks.com",
  email: "info@everygoodwork.com",
  address: "Online Ministry (HQ: Aston, PA)",
  facebookUrl: "https://www.facebook.com/profile.php?id=61575731017076",
  youtubeUrl: "https://www.youtube.com/@EveryGoodWorkMinistriesInc",
  instagramUrl: "#",
  tiktokUrl: "https://www.tiktok.com/@every.good.work?is_from_webapp=1&sender_device=pc",
  missionStatement: "Serving the weak, the poor, and the child of God. Spreading the Word to the community.",
  donationUrl: "https://donate.stripe.com/7sYfZh7Wq4xmfnKcTR0Ba00",
  serviceTimes: [
    { day: "Sunday", time: "10:00 AM", label: "Online Service (YouTube)" },
    { day: "Wednesday", time: "7:00 PM", label: "Online Bible Study" },
    { day: "Friday", time: "6:00 PM", label: "Prayer Meeting" },
  ]
};

interface SiteContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
}

const SiteContext = createContext<SiteContextType>({
  config: defaultConfig,
  updateConfig: () => {},
});

export const useSiteConfig = () => useContext(SiteContext);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('siteConfig');
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem('siteConfig', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <SiteContext.Provider value={{ config, updateConfig }}>
      {children}
    </SiteContext.Provider>
  );
};