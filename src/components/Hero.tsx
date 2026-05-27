import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ArrowDownRight, ArrowDown, RefreshCw, Upload, Film, Sparkles, Video } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data';

interface HeroProps {
  language: Language;
}

export default function Hero({ language }: HeroProps) {
  const t = translations[language];
  const [time, setTime] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States for custom GIF or Video player
  const [gifSrc, setGifSrc] = useState<string>(() => {
    return localStorage.getItem('stella_hero_gif') || 'https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-alone-on-the-beach-at-sunset-22851-large.mp4';
  });
  const [gifPlaying, setGifPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(100);

  const isVideo = gifSrc.startsWith('data:video/') || gifSrc.endsWith('.mp4') || gifSrc.endsWith('.webm') || gifSrc.endsWith('.mov') || gifSrc.includes('video');

  // Shanghai Ticking clock (UTC+8)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Countdown progress bar & auto transition
  useEffect(() => {
    if (!gifPlaying) return;

    setProgress(100);
    const duration = 4500; // 4.5 seconds playtime
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(progressTimer);
          setGifPlaying(false);
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(progressTimer);
  }, [gifPlaying]);

  const handleGifUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setGifSrc(reader.result);
          try {
            localStorage.setItem('stella_hero_gif', reader.result);
          } catch (e) {
            console.warn('LocalStorage quota exceeded. Safe fallback utilized.', e);
          }
          setGifPlaying(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleReplay = () => {
    setGifPlaying(true);
  };

  const marqueeItems = [
    language === 'zh' ? '张温雅 • DATA ANALYST' : 'WENYA ZHANG • DATA ANALYTICS',
    language === 'zh' ? '策略运营 • STRATEGY & OPS' : 'STRATEGY & OPERATIONS • BYTEDANCE',
    language === 'zh' ? '风控合规 • RISK SHIELD' : 'RISK STRATEGY • HSBC ALUM',
    language === 'zh' ? 'AI 视频艺术家 • CREATIVE AI' : 'AI CINEMATIC CREATOR • AFTERSHE',
  ];

  return (
    <section id="hero" className="relative min-h-[95vh] flex flex-col justify-between pt-28 bg-[#ededed] dark:bg-[#1c1c1c] text-neutral-900 dark:text-neutral-50 overflow-hidden transition-colors duration-500">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d3d3d3_1px,transparent_1px)] dark:bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      {/* Top Meta Details bar */}
      <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 z-10 pt-4 md:pt-8">
        {/* Left Widget: Location and rotating wireglobe */}
        <div className="flex items-center gap-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-5 py-3 rounded-full border border-neutral-300 dark:border-neutral-800 shadow-sm self-start">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {t.located}
            </span>
            <span className="text-xs font-semibold font-sans">{t.locationState}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center animate-spin [animation-duration:12s]">
            <Globe className="w-4.5 h-4.5 text-neutral-600 dark:text-neutral-400" />
          </div>
        </div>

        {/* Dynamic Time in Shanghai */}
        <div className="flex flex-col text-left sm:text-right">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {language === 'zh' ? '北京/上海时间 (UTC+8)' : 'SHANGHAI TIME (UTC+8)'}
          </span>
          <span className="text-sm font-mono font-bold text-neutral-800 dark:text-neutral-100 mt-1">
            {time || '15:38:41'}
          </span>
        </div>
      </div>

      {/* Main Center content area */}
      <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-12 grid grid-cols-1 md:grid-cols-12 items-center gap-10 flex-1 py-12 z-10">
        
        {/* Left Side: Meta Tag and Title */}
        <div className="col-span-1 md:col-span-6 flex flex-col justify-center items-start text-left">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-emerald-600 dark:text-emerald-400 font-semibold mb-4 bg-emerald-500/10 px-3 py-1 rounded-full">
            {language === 'zh' ? '数字策略专家' : 'DIGITAL STRATEGIST'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-neutral-900 dark:text-neutral-50 mb-6">
            {language === 'zh' ? '让数据流动' : 'Flow with Data'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500">
              {language === 'zh' ? '用创作发声' : 'Speak with Cinema'}
            </span>
          </h1>
          <p className="font-sans text-sm md:text-base text-neutral-600 dark:text-neutral-300 max-w-md leading-relaxed mb-8">
            {t.aboutIntro}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#skills"
              className="px-6 py-3.5 rounded-full bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 font-medium text-xs tracking-wider uppercase shadow-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all flex items-center gap-2 group hover-perspective"
              id="hero-explore-btn"
            >
              <span>{language === 'zh' ? '交互核心技能' : 'Explore Core Skills'}</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/20 hover:bg-white/50 dark:bg-black/10 dark:hover:bg-black/30 text-neutral-800 dark:text-neutral-200 font-medium text-xs tracking-wider uppercase transition-all"
              id="hero-contact-btn"
            >
              {language === 'zh' ? '与我联系' : 'Get In Touch'}
            </a>
          </div>
        </div>

        {/* Right Side: High-End Interactive Logo Frame (Cinematic Intro Player) */}
        <div className="col-span-1 md:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96">
            {/* Elegant Outer glowing border ring */}
            <div className="absolute inset-x-0 -inset-y-2 rounded-3xl bg-gradient-to-tr from-emerald-500 via-indigo-500 to-emerald-400 opacity-20 dark:opacity-30 blur-2xl pointer-events-none" />

            {/* Centered stylized visual art card (Monitor frame style) */}
            <div className="relative w-full h-full rounded-2xl border border-neutral-300/80 dark:border-neutral-700/80 bg-white dark:bg-neutral-900/90 flex flex-col justify-between overflow-hidden shadow-2xl p-4 transition-all hover-perspective">
              
              <AnimatePresence mode="wait">
                {gifPlaying ? (
                  // PLAYING STATE (Plays her uploaded GIF, MP4, or high-end particle placeholder)
                  <motion.div
                    key="playing-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-stretch bg-black z-20"
                  >
                    <div className="relative flex-1 overflow-hidden flex items-center justify-center">
                      {isVideo ? (
                        <video
                          src={gifSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            setGifSrc('https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-alone-on-the-beach-at-sunset-22851-large.mp4');
                          }}
                        />
                      ) : (
                        <img
                          src={gifSrc}
                          alt="Stella Intro Showreel GIF"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to original abstract link on error
                            (e.target as HTMLImageElement).src = 'https://media.giphy.com/media/Y3vD6u8R6p8SgV9A77/giphy.gif';
                          }}
                        />
                      )}
                      
                      {/* Technical CRT Screen overlays */}
                      <div className="absolute inset-0 bg-radial-gradient(circle, transparent 70%, rgba(0,0,0,0.4)) pointer-events-none" />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[9px] font-mono tracking-widest text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span>PLAYING</span>
                      </div>
                      
                      {/* Progress elapsed background indicators */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[9px] font-mono text-neutral-450">
                        {(4.5 * (progress / 100)).toFixed(1)}s / 4.5s
                      </div>
                    </div>

                    {/* Progress Bar Controller at bottom */}
                    <div className="h-1 w-full bg-neutral-800 relative">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </motion.div>
                ) : (
                  // REVEALED STATE ("Know about Stella Zhang" / "了解张温雅")
                  <motion.div
                    key="revealed-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="absolute inset-0 bg-white dark:bg-neutral-900 flex flex-col justify-between p-6 sm:p-8 z-20 text-left"
                  >
                    {/* Tiny visual tech line */}
                    <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-800/80 pb-3">
                      <span className="font-mono text-[9px] text-neutral-450 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-emerald-500 animate-spin [animation-duration:10s]" />
                        {language === 'zh' ? '张温雅的数字名片' : 'STELLA\'S IDENTITY'}
                      </span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono px-1.5 py-0.5 rounded">
                        ONLINE
                      </span>
                    </div>

                    {/* Large display Typography requested by user */}
                    <div className="my-auto py-2">
                      <motion.h3
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight"
                      >
                        {language === 'zh' ? '了解张温雅' : 'Know about Stella Zhang'}
                      </motion.h3>
                      <motion.p
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-sans text-xs text-neutral-500 dark:text-neutral-450 mt-2 leading-relaxed"
                      >
                        {language === 'zh'
                          ? '上海财经大学研究生一年级在读，在金融、传媒、互联网、AI领域多方面尝试的Z时代商科生。'
                          : 'First-year graduate student at Shanghai University of Finance and Economics, a Gen Z business student exploring multiple fields including finance, media, internet, and AI.'
                        }
                      </motion.p>
                    </div>

                    {/* Inner controls layout */}
                    <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-800/60 pt-4">
                      {/* Replay controller */}
                      <button
                        onClick={handleReplay}
                        className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-semibold text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors uppercase py-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5 animate-spin-reverse hover:rotate-180 transition-all duration-500" />
                        <span>{language === 'zh' ? '重新播放' : 'REPLAY INTRO'}</span>
                      </button>

                      {/* Customize Upload controller */}
                      <button
                        onClick={triggerUpload}
                        className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-semibold text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors uppercase py-1"
                      >
                        <Upload className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{language === 'zh' ? '自定义 视频/GIF' : 'UPLOAD VIDEO/GIF'}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hidden file input for uploading actual GIF/Video */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/gif,image/*,video/mp4,video/quicktime,video/webm"
                onChange={handleGifUpload}
                className="hidden"
              />

              {/* Underlying styling elements just to hold layout block size of container spacing */}
              <div className="flex justify-between items-start z-0 opacity-0 select-none">
                <span className="font-mono text-xs">SPACING HOLDER</span>
              </div>
              <div className="flex flex-col items-center justify-center py-4 z-0 opacity-0 select-none">
                <div className="font-display text-8xl">W</div>
              </div>
              <div className="flex justify-between items-end border-t border-neutral-200 dark:border-neutral-800/80 pt-4 z-0 opacity-0 select-none">
                <span className="text-xs">SPACING HOLDER</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Extreme Bottom: Frictionless Infinite Marquee (Dennis Snellenberg Trademark) */}
      <div className="relative w-full bg-neutral-900 dark:bg-black py-6 sm:py-8 border-t border-neutral-800 overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap min-w-full">
          {/* Marquee Container (repeated twice to establish loops) */}
          <div className="flex items-center gap-16 animate-marquee shrink-0 pr-16 select-none">
            {marqueeItems.map((text, idx) => (
              <span
                key={`m1-${idx}`}
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-transparent stroke-neutral-700 dark:stroke-neutral-800 [-webkit-text-stroke-width:1px] hover:stroke-emerald-400 dark:hover:stroke-emerald-500 tracking-wider transition-all duration-300"
              >
                {text} —
              </span>
            ))}
          </div>
          <div className="flex items-center gap-16 animate-marquee shrink-0 pr-16 select-none">
            {marqueeItems.map((text, idx) => (
              <span
                key={`m2-${idx}`}
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-transparent stroke-neutral-700 dark:stroke-neutral-800 [-webkit-text-stroke-width:1px] hover:stroke-emerald-400 dark:hover:stroke-emerald-500 tracking-wider transition-all duration-300"
              >
                {text} —
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
