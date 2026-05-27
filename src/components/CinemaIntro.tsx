import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Keyboard, MousePointer, Sparkles, Settings, Upload, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

interface CinemaIntroProps {
  language: Language;
  onEnter: () => void;
}

export default function CinemaIntro({ language, onEnter }: CinemaIntroProps) {
  const [phase, setPhase] = useState<'opening' | 'looping'>('opening');
  const [isMuted, setIsMuted] = useState<boolean>(true); // Browser autoplay policies force muted initial state
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // Custom opening & looping video URLs that can be dynamically updated or uploaded
  const [openingVideo, setOpeningVideo] = useState<string>(() => {
    return localStorage.getItem('cinema_opening_video') || 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-30043-large.mp4';
  });
  const [loopingVideo, setLoopingVideo] = useState<string>(() => {
    return localStorage.getItem('cinema_looping_video') || 'https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-alone-on-the-beach-at-sunset-22851-large.mp4';
  });

  const openingRef = useRef<HTMLVideoElement>(null);
  const loopingRef = useRef<HTMLVideoElement>(null);

  // Phase 1: Opening 4-second film sequence
  useEffect(() => {
    if (phase === 'opening') {
      const timer = setTimeout(() => {
        setPhase('looping');
      }, 4000); // Exactly 4 seconds as requested

      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Phase 2: Listen to click or keypress to enter the main site
  useEffect(() => {
    if (phase !== 'looping' || isFadingOut) return;

    const handleInteraction = (e: KeyboardEvent | MouseEvent) => {
      // Avoid triggering when interacting with the custom config panel
      const target = e.target as HTMLElement;
      if (target.closest('.config-panel') || target.closest('.volume-toggle-btn')) {
        return;
      }
      triggerEnter();
    };

    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('click', handleInteraction);

    return () => {
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [phase, isFadingOut]);

  const triggerEnter = () => {
    setIsFadingOut(true);
    // Smooth fade duration
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  const handleUploadVideo = (e: React.ChangeEvent<HTMLInputElement>, type: 'opening' | 'looping') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (type === 'opening') {
            setOpeningVideo(reader.result);
            try {
              localStorage.setItem('cinema_opening_video', reader.result);
            } catch (err) {
              console.warn('LocalStorage size limit exceeded for video.', err);
            }
          } else {
            setLoopingVideo(reader.result);
            try {
              localStorage.setItem('cinema_looping_video', reader.result);
            } catch (err) {
              console.warn('LocalStorage size limit exceeded for video.', err);
            }
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetVideosToDefault = () => {
    localStorage.removeItem('cinema_opening_video');
    localStorage.removeItem('cinema_looping_video');
    setOpeningVideo('https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-30043-large.mp4');
    setLoopingVideo('https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-alone-on-the-beach-at-sunset-22851-large.mp4');
  };

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-black text-white overflow-hidden flex flex-col justify-between items-stretch select-none"
        >
          {/* Subtle Grid Scanning Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-10" />

          {/* Interactive Top-bar (Settings & Language indicator) */}
          <div className="relative z-20 flex justify-between items-center p-6 sm:p-8 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                {phase === 'opening'
                  ? (language === 'zh' ? '开篇短片播放中 • 4s' : 'INTRO SEQUENCE • 4S')
                  : (language === 'zh' ? '交互循环中 • 点击即可进入' : 'INTERACTIVE LOOP • REPEAT-PLAY')
                }
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Settings Trigger inside intro */}
              <button
                onClick={() => setShowConfig(!showConfig)}
                className="config-panel-trigger p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-neutral-450 hover:text-white"
                title={language === 'zh' ? '配置开场视频' : 'Configure Opening Videos'}
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Volume Controller Button - Required by User */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="volume-toggle-btn flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs font-mono font-medium tracking-wider text-neutral-300 hover:text-white cursor-pointer"
                id="intro-volume-toggle"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-[10px]">{language === 'zh' ? '静音' : 'MUTED'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                    <span className="text-[10px]">{language === 'zh' ? '音量开启' : 'AUDIO ON'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Core Video Player Arena */}
          <div className="absolute inset-0 w-full h-full bg-neutral-950 flex items-center justify-center">
            {phase === 'opening' ? (
              <video
                ref={openingRef}
                src={openingVideo}
                autoPlay
                playsInline
                muted={isMuted}
                className="w-full h-full object-cover transition-opacity duration-1000"
                onError={(e) => {
                  console.error('Opening video load error - fallback utilized');
                  setOpeningVideo('https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-30043-large.mp4');
                }}
              />
            ) : (
              <video
                ref={loopingRef}
                src={loopingVideo}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                className="w-full h-full object-cover transition-opacity duration-1000 animate-fade-in"
                onError={(e) => {
                  console.error('Looping video load error - fallback utilized');
                  setLoopingVideo('https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-alone-on-the-beach-at-sunset-22851-large.mp4');
                }}
              />
            )}

            {/* Cinematic Gradient Mask on the edges */}
            <div className="absolute inset-0 bg-radial-gradient(circle, transparent 60%, rgba(0,0,0,0.85) 100%) pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>

          {/* Interactive Dynamic Prompt Overlay */}
          <div className="relative z-20 flex flex-col items-center p-8 sm:p-12 gap-4 text-center select-none pointer-events-none mt-auto">
            <AnimatePresence mode="wait">
              {phase === 'opening' ? (
                <motion.div
                  key="opening-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-full">
                    <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
                    <span className="font-mono text-[9px] tracking-widest text-[#9ca3af]">
                      {language === 'zh' ? '正在渲染开场视觉艺术' : 'RENDERING GENERATIVE SPACE'}
                    </span>
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white/90 uppercase">
                    {language === 'zh' ? '张温雅的个人多维展厅' : 'WENYA ZHANG DIGITAL EXHIBIT'}
                  </h1>
                </motion.div>
              ) : (
                <motion.div
                  key="looping-text"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex flex-col items-center gap-2 cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 shadow-lg"
                  >
                    <div className="flex gap-2 items-center text-emerald-400">
                      <Keyboard className="w-4 h-4 animate-bounce" />
                      <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
                        {language === 'zh' ? '按任意键 或 点击屏幕进入主页' : 'PRESS ANY KEY OR TAP TO ENTER'}
                      </span>
                    </div>
                    <span className="font-sans text-[10px] text-neutral-400">
                      {language === 'zh' ? '— 观影结束，欢迎深层解构 —' : '— SCREENING OVER. EXPLORE PORTFOLIO —'}
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Configuration Drawer */}
          <AnimatePresence>
            {showConfig && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="config-panel absolute bottom-24 right-6 sm:right-8 z-30 max-w-sm w-[90%] bg-[#0a0a0a]/95 border border-neutral-800 p-6 rounded-2xl shadow-2xl backdrop-blur-xl text-left"
              >
                <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
                  <h4 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                    <Settings className="w-4 h-4 text-emerald-500" />
                    <span>{language === 'zh' ? '设置专属开场视频' : 'Cinema Settings'}</span>
                  </h4>
                  <button
                    onClick={() => setShowConfig(false)}
                    className="text-xs font-mono text-neutral-500 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-[11px] text-neutral-400 leading-relaxed mb-4">
                  {language === 'zh'
                    ? '在此，您可以上传在附件中下载的 4s 专属视频及背景视频，它们将永久缓存在您的浏览器中。'
                    : 'Upload your own short opening clips (such as the 4s movie file from attachments) to persist locally.'}
                </p>

                <div className="space-y-4">
                  {/* Option 1: Upload Opening video */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider block">
                      {language === 'zh' ? '1. 开篇 4s 短片视频' : '1. Opening 4s Video'}
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="flex-1 flex items-center justify-between text-[11px] px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-600 transition-colors cursor-pointer text-neutral-300">
                        <span className="truncate max-w-[180px]">
                          {openingVideo.startsWith('data:') ? '✓ 自定义文件已加载' : 'default_opening.mp4'}
                        </span>
                        <Upload className="w-3.5 h-3.5 text-neutral-500" />
                        <input
                          type="file"
                          accept="video/mp4,video/quicktime,video/webm"
                          onChange={(e) => handleUploadVideo(e, 'opening')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Option 2: Upload Looping video */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider block">
                      {language === 'zh' ? '2. 第二个 循环背景视频' : '2. Second Looping Video'}
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="flex-1 flex items-center justify-between text-[11px] px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-600 transition-colors cursor-pointer text-neutral-300">
                        <span className="truncate max-w-[180px]">
                          {loopingVideo.startsWith('data:') ? '✓ 自定义文件已加载' : 'default_looping.mp4'}
                        </span>
                        <Upload className="w-3.5 h-3.5 text-neutral-500" />
                        <input
                          type="file"
                          accept="video/mp4,video/quicktime,video/webm"
                          onChange={(e) => handleUploadVideo(e, 'looping')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Reset button */}
                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={resetVideosToDefault}
                      className="flex-1 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[10px] font-mono tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer text-center"
                    >
                      {language === 'zh' ? '恢复默认视频' : 'Reset to Default'}
                    </button>
                    <button
                      onClick={() => setShowConfig(false)}
                      className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-bold tracking-wider transition-colors cursor-pointer text-center"
                    >
                      {language === 'zh' ? '确定保存' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
