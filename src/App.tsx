import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SkillsBubble from './components/SkillsBubble';
import Internships from './components/Internships';
import Education from './components/Education';
import AIVideo from './components/AIVideo';
import Contact from './components/Contact';
import CinemaIntro from './components/CinemaIntro';
import { Language } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Sync Dark/Light class with Document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle overflow locking during intro sequence
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasEntered]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#141414] text-neutral-900 dark:text-neutral-50 transition-colors duration-500 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Cinematic Intro Video Sequence */}
      {!hasEntered ? (
        <CinemaIntro
          language={language}
          onEnter={() => setHasEntered(true)}
        />
      ) : (
        <>
          {/* Premium Bilingual & Theme Controller Navigation Header */}
          <Navigation
            language={language}
            setLanguage={setLanguage}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />

          {/* Dennis Snellenberg-inspired Hero & Infinitely Scrolling Marquee */}
          <Hero language={language} />

          {/* Interactive Core Skills Bubble Visualization & Filtering Drawer */}
          <SkillsBubble
            language={language}
            selectedSkillId={selectedSkillId}
            setSelectedSkillId={setSelectedSkillId}
          />

          {/* Comprehensive Corporate & Operations Chronological Timeline */}
          <Internships
            language={language}
            selectedSkillId={selectedSkillId}
          />

          {/* AI Cinematic Explorations Screen */}
          <AIVideo language={language} />

          {/* Dual Elite Education & Quant-Research Milestones Stage */}
          <Education language={language} />

          {/* Pristine Outreach and 3-Channel Communication Portal */}
          <Contact language={language} />
        </>
      )}
    </div>
  );
}
