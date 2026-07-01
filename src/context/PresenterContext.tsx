import React, { createContext, useContext, useState, useEffect } from 'react';

interface PresenterContextType {
  presenterMode: boolean;
  setPresenterMode: (val: boolean) => void;
  currentAxisIdx: number;
  setCurrentAxisIdx: (idx: number) => void;
  timerSeconds: number;
  setTimerSeconds: (secs: number) => void;
  isTimerRunning: boolean;
  setIsTimerRunning: (running: boolean) => void;
  fontSizeClass: 'text-normal' | 'text-large' | 'text-xlarge';
  setFontSizeClass: (fs: 'text-normal' | 'text-large' | 'text-xlarge') => void;
  showSpeakerNotes: boolean;
  setShowSpeakerNotes: (val: boolean) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const PresenterContext = createContext<PresenterContextType | undefined>(undefined);

export const PresenterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [presenterMode, setPresenterMode] = useState<boolean>(() => {
    return localStorage.getItem('presenter_mode') === 'true';
  });
  const [currentAxisIdx, setCurrentAxisIdx] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [fontSizeClass, setFontSizeClass] = useState<'text-normal' | 'text-large' | 'text-xlarge'>('text-normal');
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('app_theme') as 'dark' | 'light') || 'dark';
  });

  // Sync mode to local storage and document class
  useEffect(() => {
    localStorage.setItem('presenter_mode', String(presenterMode));
    if (presenterMode) {
      document.documentElement.classList.add('presenter-active');
      setIsTimerRunning(true);
    } else {
      document.documentElement.classList.remove('presenter-active');
      document.documentElement.classList.remove('text-large');
      document.documentElement.classList.remove('text-xlarge');
      setIsTimerRunning(false);
    }
  }, [presenterMode]);

  // Sync theme
  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  // Sync font size classes
  useEffect(() => {
    if (presenterMode) {
      document.documentElement.classList.remove('text-large', 'text-xlarge');
      if (fontSizeClass === 'text-large') {
        document.documentElement.classList.add('text-large');
      } else if (fontSizeClass === 'text-xlarge') {
        document.documentElement.classList.add('text-xlarge');
      }
    }
  }, [fontSizeClass, presenterMode]);

  // Timer tick effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && presenterMode) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, presenterMode]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <PresenterContext.Provider
      value={{
        presenterMode,
        setPresenterMode,
        currentAxisIdx,
        setCurrentAxisIdx,
        timerSeconds,
        setTimerSeconds,
        isTimerRunning,
        setIsTimerRunning,
        fontSizeClass,
        setFontSizeClass,
        showSpeakerNotes,
        setShowSpeakerNotes,
        theme,
        toggleTheme
      }}
    >
      {children}
    </PresenterContext.Provider>
  );
};

export const usePresenter = () => {
  const context = useContext(PresenterContext);
  if (!context) {
    throw new Error('usePresenter must be used within a PresenterProvider');
  }
  return context;
};
