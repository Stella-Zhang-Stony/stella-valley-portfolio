import { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SkillsBubble from './components/SkillsBubble';
import Internships from './components/Internships';
import Education from './components/Education';
import AIVideo from './components/AIVideo';
import Contact from './components/Contact';
import CinemaIntro from './components/CinemaIntro';
import { Language } from './types';

const DB_NAME = 'cinema_local_assets_db';
const STORE_NAME = 'video_blobs';
const DEFAULT_AUDIO = 'https://assets.mixkit.co/music/preview/mixkit-serene-view-1017.mp3';

function getLocalAudioURL(key: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const getRequest = store.get(key);
        getRequest.onsuccess = () => {
          const blob = getRequest.result;
          if (blob instanceof Blob) {
            const blobUrl = URL.createObjectURL(blob);
            resolve(blobUrl);
          } else {
            resolve(null);
          }
        };
        getRequest.onerror = () => resolve(null);
      };
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export default function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Global Audio States
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [customAudio, setCustomAudio] = useState<string>(DEFAULT_AUDIO);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  // Load custom audio from IndexedDB on mount
  useEffect(() => {
    let active = true;
    const fetchStoredAudio = async () => {
      const audUrl = await getLocalAudioURL('cinema_custom_audio');
      if (audUrl && active) {
        setCustomAudio(audUrl);
      }
    };
    fetchStoredAudio();
    return () => {
      active = false;
    };
  }, []);

  // Sync playback state with Muted/Audio controllers
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.log('Global soundtrack autoplay deferred:', e);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, customAudio]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#141414] text-neutral-900 dark:text-neutral-50 transition-colors duration-500 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Global Seamless Soundtrack player */}
      <audio
        ref={audioRef}
        src={customAudio}
        loop
        playsInline
      />

      {/* Cinematic Intro Video Sequence */}
      {!hasEntered ? (
        <CinemaIntro
          language={language}
          onEnter={() => setHasEntered(true)}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          customAudio={customAudio}
          setCustomAudio={setCustomAudio}
        />
      ) : (
        <>
          {/* Premium Bilingual & Theme Controller Navigation Header */}
          <Navigation
            language={language}
            setLanguage={setLanguage}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            isMuted={isMuted}
            toggleMute={() => setIsMuted(!isMuted)}
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
