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
  missionStatement: string;
  serviceTimes: ServiceTime[];
}

const defaultConfig: SiteConfig = {
  ministryName: "Every Good Work Ministry",
  domain: "everygoodworks.com",
  email: "contact@everygoodworks.com",
  address: "Aston, PA",
  facebookUrl: "#",
  youtubeUrl: "#",
  instagramUrl: "#",
  missionStatement: "Spreading the Word. Loving the People. Glorifying the Son.",
  serviceTimes: [
    { day: "Sunday", time: "10:00 AM", label: "Worship Service" },
    { day: "Wednesday", time: "7:00 PM", label: "Bible Study" },
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