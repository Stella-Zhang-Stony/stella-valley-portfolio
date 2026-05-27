import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Keyboard, Sparkles, Settings, Upload, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

interface CinemaIntroProps {
  language: Language;
  onEnter: () => void;
}

// Simple & Bulletproof IndexedDB Helper for Large Video Blobs
const DB_NAME = 'cinema_local_assets_db';
const STORE_NAME = 'video_blobs';

function getLocalVideoURL(key: string): Promise<string | null> {
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
    } catch (e) {
      console.warn('IndexedDB operations not supported in this frame/browser environment.', e);
      resolve(null);
    }
  });
}

function storeLocalVideoBlob(key: string, blob: Blob): Promise<void> {
  return new Promise((resolve, reject) => {
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
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const putRequest = store.put(blob, key);
        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject(putRequest.error);
      };
      request.onerror = () => reject(request.error);
    } catch (e) {
      reject(e);
    }
  });
}

function removeLocalVideoBlob(key: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        store.delete(key);
        resolve();
      };
      request.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

// Fallbacks which are CDN-based, highly optimized, and globally unblocked
const DEFAULT_OPENING = 'https://vjs.zencdn.net/v/oceans.mp4';
const DEFAULT_LOOPING = 'https://www.w3schools.com/html/movie.mp4';

export default function CinemaIntro({ language, onEnter }: CinemaIntroProps) {
  const [phase, setPhase] = useState<'opening' | 'looping'>('opening');
  const [isMuted, setIsMuted] = useState<boolean>(true); // Forcing autoplay
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // States for video URLs
  const [openingVideo, setOpeningVideo] = useState<string>(DEFAULT_OPENING);
  const [loopingVideo, setLoopingVideo] = useState<string>(DEFAULT_LOOPING);
  const [hasCustomOpening, setHasCustomOpening] = useState<boolean>(false);
  const [hasCustomLooping, setHasCustomLooping] = useState<boolean>(false);

  const openingRef = useRef<HTMLVideoElement>(null);
  const loopingRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load videos from IndexedDB or Fallbacks on mount
  useEffect(() => {
    let active = true;
    const fetchStoredAssets = async () => {
      const opUrl = await getLocalVideoURL('cinema_opening_video');
      if (opUrl && active) {
        setOpeningVideo(opUrl);
        setHasCustomOpening(true);
      }
      const lpUrl = await getLocalVideoURL('cinema_looping_video');
      if (lpUrl && active) {
        setLoopingVideo(lpUrl);
        setHasCustomLooping(true);
      }
    };
    fetchStoredAssets();
    return () => {
      active = false;
    };
  }, []);

  // Programmatic Autoplay Triggers
  useEffect(() => {
    const playCurrentVideo = async () => {
      if (phase === 'opening') {
        if (openingRef.current) {
          try {
            openingRef.current.muted = isMuted;
            await openingRef.current.play();
          } catch (e) {
            console.log('Opening autoplay blocked/deferred:', e);
          }
        }
      } else {
        if (loopingRef.current) {
          try {
            loopingRef.current.muted = isMuted;
            await loopingRef.current.play();
          } catch (e) {
            console.log('Looping autoplay blocked/deferred:', e);
          }
        }
      }
    };
    playCurrentVideo();
  }, [phase, openingVideo, loopingVideo, isMuted]);

  // Phase 1: Opening 4-second cinematic sequence
  useEffect(() => {
    if (phase === 'opening') {
      const timer = setTimeout(() => {
        setPhase('looping');
      }, 4000); // 4-second requirement
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Phase 2: Keypress or Click to Enter Website
  useEffect(() => {
    if (phase !== 'looping' || isFadingOut) return;

    const handleEnterPress = (e: KeyboardEvent | MouseEvent) => {
      const target = e.target as HTMLElement;
      // Prevent entering if user is tweaking volume or opening drawers
      if (target.closest('.config-panel') || target.closest('.volume-toggle-btn') || target.closest('input')) {
        return;
      }
      triggerEnter();
    };

    window.addEventListener('keydown', handleEnterPress);
    window.addEventListener('click', handleEnterPress);

    return () => {
      window.removeEventListener('keydown', handleEnterPress);
      window.removeEventListener('click', handleEnterPress);
    };
  }, [phase, isFadingOut]);

  const triggerEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  // Real-time Canvas Generative Fluid Backdrop
  // Runs fluid mathematical waves to look absolutely amazing & premium, never a black screen.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Wave configurations
    const lines = 12;
    let step = 0;

    const render = () => {
      step += 0.003;
      // Deep elegant ambient midnight dark background
      ctx.fillStyle = 'rgba(10, 10, 10, 0.06)';
      ctx.fillRect(0, 0, width, height);

      // Draw mathematical flow-wave strings (Generative digital art)
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = i === 0 ? 1.5 : 0.5;
        // Alternating emerald / indigo color spectra
        const progress = i / lines;
        const r = Math.floor(16 + progress * 40);
        const g = Math.floor(185 + progress * 20);
        const b = Math.floor(129 - progress * 40);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.12 - progress * 0.08})`;

        const amplitude = (30 + i * 15) * Math.sin(step + i * 0.1);
        const frequency = 0.0015 + i * 0.0002;

        for (let x = 0; x < width; x += 15) {
          const y =
            height / 2 +
            amplitude * Math.sin(x * frequency + step * 4 + i * 0.5) +
            Math.cos(x * 0.001 - step) * 50;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Upload Video handler (storing Blobs in IndexedDB safely)
  const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>, type: 'opening' | 'looping') => {
    const file = e.target.files?.[0];
    if (file) {
      const key = type === 'opening' ? 'cinema_opening_video' : 'cinema_looping_video';
      try {
        await storeLocalVideoBlob(key, file);
        const objectUrl = URL.createObjectURL(file);
        if (type === 'opening') {
          setOpeningVideo(objectUrl);
          setHasCustomOpening(true);
        } else {
          setLoopingVideo(objectUrl);
          setHasCustomLooping(true);
        }
      } catch (err) {
        console.error('Failed to store high-res video in browser database:', err);
        alert(language === 'zh'
          ? '视频存储失败，建议上传 20MB 以内的短视频。'
          : 'Storage failed, please upload smaller video file (under 20MB).'
        );
      }
    }
  };

  const resetVideosToDefault = async () => {
    await removeLocalVideoBlob('cinema_opening_video');
    await removeLocalVideoBlob('cinema_looping_video');
    setOpeningVideo(DEFAULT_OPENING);
    setLoopingVideo(DEFAULT_LOOPING);
    setHasCustomOpening(false);
    setHasCustomLooping(false);
  };

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-[#0a0a0a] text-white overflow-hidden flex flex-col justify-between items-stretch select-none"
        >
          {/* Real-time Generative Background Canvas: Prevents empty black space 100% of the time */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80" />

          {/* Minimal Particle Grid layer */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.06)_1.2px,transparent_1.2px)] [background-size:20px_20px] pointer-events-none z-10" />

          {/* Top Info Bar */}
          <div className="relative z-30 flex justify-between items-center p-6 sm:p-8 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-350">
                {phase === 'opening'
                  ? (language === 'zh' ? '开篇短片 • 4S SECTOR' : 'INTRO CHROMATIC TIMELINE • 4S')
                  : (language === 'zh' ? '交互中 • 敲击任意键进入' : 'READY TO ENTER • CLICK ANYWHERE')
                }
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Settings Configuration Module */}
              <button
                onClick={() => setShowConfig(!showConfig)}
                className="config-panel-trigger p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/12 transition-all text-neutral-400 hover:text-emerald-400 active:scale-95 cursor-pointer"
                title={language === 'zh' ? '后台视频自定义' : 'Upload custom videos'}
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Volume Controller - Audio toggling required by User */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="volume-toggle-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800/90 border border-white/10 hover:border-emerald-500/30 transition-all text-xs font-mono font-medium text-neutral-300 hover:text-white cursor-pointer active:scale-95"
                id="intro-volume-toggle"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-rose-500 animate-pulse" />
                    <span className="text-[10px] tracking-widest">{language === 'zh' ? '静音中' : 'MUTED'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] tracking-widest text-emerald-410">{language === 'zh' ? '扬声器开启' : 'AUDIO ON'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Cinematic Video Player Arena */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10 pointer-events-none bg-transparent">
            {phase === 'opening' ? (
              <video
                ref={openingRef}
                src={openingVideo}
                autoPlay
                playsInline
                muted={isMuted}
                className="w-full h-full object-cover transition-opacity duration-700 pointer-events-none"
                style={{ opacity: 1 }}
                onError={() => {
                  console.warn('Opening video load failed - fallback active');
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
                className="w-full h-full object-cover transition-opacity duration-700 pointer-events-none animate-fade-in"
                style={{ opacity: 0.85 }}
                onError={() => {
                  console.warn('Looping video load failed - fallback active');
                }}
              />
            )}

            {/* Luxurious Film vignetting masks */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none z-20" />
            <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 40%, rgba(10,10,10,0.95) 100%) pointer-events-none z-20" />
          </div>

          {/* Dynamic Instructions & Core Identity Banner */}
          <div className="relative z-30 flex flex-col items-center p-8 sm:p-14 gap-5 text-center pointer-events-none mt-auto">
            <AnimatePresence mode="wait">
              {phase === 'opening' ? (
                <motion.div
                  key="opening-text"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    <span className="font-mono text-[9px] tracking-widest text-neutral-400">
                      {language === 'zh' ? '正在探索前沿 AI 影像质感' : 'AI DIGITAL VISTA ENGINES INITIATED'}
                    </span>
                  </div>
                  <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase max-w-xl mx-auto leading-tight">
                    {language === 'zh' ? '张温雅的个人数字影院' : 'Stella Zhang Film Exhibition'}
                  </h1>
                </motion.div>
              ) : (
                <motion.div
                  key="looping-text"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.02, 1],
                      boxShadow: [
                        '0 0 10px rgba(16,185,129,0.15)',
                        '0 0 25px rgba(16,185,129,0.3)',
                        '0 0 10px rgba(16,185,129,0.15)'
                      ]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex flex-col items-center gap-2.5 cursor-pointer pointer-events-auto bg-black/75 backdrop-blur-xl px-8 py-5 rounded-2xl border border-emerald-500/20 max-w-sm sm:max-w-md"
                    onClick={triggerEnter}
                  >
                    <div className="font-mono text-xs font-black tracking-[0.25em] text-emerald-400 uppercase flex items-center justify-center gap-2">
                      <Keyboard className="w-4 h-4 animate-bounce text-emerald-400" />
                      <span>{language === 'zh' ? '点击此处 或 敲击任意键进入' : 'PRESS ANY KEY OR TAP DISPLAY TO ENTER'}</span>
                    </div>
                    <span className="font-sans text-[11px] text-neutral-450 leading-relaxed font-light">
                      {language === 'zh'
                        ? '首篇放映结束。在第二个视频中，您可选择右上方齿轮，上传您在附件中准备的 4s 第一视频与个人循环代表作进行展示！'
                        : 'First reel completed. Feel free to use the gear icon upper right to upload and preview custom clips!'}
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Settings / Local video upload module */}
          <AnimatePresence>
            {showConfig && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 25 }}
                className="config-panel absolute bottom-28 right-6 sm:right-10 z-50 max-w-md w-[92%] bg-neutral-950/95 border border-neutral-800 p-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-left"
              >
                <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2.5">
                  <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-500" />
                    <span>{language === 'zh' ? '个性化多媒体演映配置' : 'Personalized Video Portal'}</span>
                  </h4>
                  <button
                    onClick={() => setShowConfig(false)}
                    className="text-white hover:text-rose-500 transition-colors cursor-pointer text-xs font-mono px-1"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-[11.5px] text-neutral-400 leading-relaxed mb-5">
                  {language === 'zh'
                    ? '为了解决由于极高带宽限制引起的网络视频加载问题，本框架配备了尖端的本地 IndexedDB 存储技术。您可以放心上传体积在 30MB 左右的任何视频，它们将 100% 离线留存，不会发生网络黑屏！'
                    : 'We support local indexing databases. You can drag and drop your files down here, it will never show a black screen again!'}
                </p>

                <div className="space-y-4">
                  {/* Upload 1 */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase text-neutral-450 tracking-wider flex justify-between items-center">
                      <span>{language === 'zh' ? '第一幕 • 4秒开篇短片' : 'ACT 1 • 4S OPENING SPEED FILM'}</span>
                      {hasCustomOpening && <span className="text-emerald-400 font-bold">● {language === 'zh' ? '已缓存' : 'STORED'}</span>}
                    </label>
                    <label className="flex items-center justify-between text-xs px-3.5 py-3.5 bg-neutral-900 border border-neutral-850 hover:border-emerald-500/40 rounded-xl transition-all cursor-pointer text-neutral-300">
                      <span className="truncate max-w-[240px] font-mono text-[11px] text-neutral-400">
                        {hasCustomOpening ? '✓ custom_opening_4s.mp4' : 'default_oceans.mp4'}
                      </span>
                      <Upload className="w-4 h-4 text-neutral-500" />
                      <input
                        type="file"
                        accept="video/mp4,video/quicktime,video/webm"
                        onChange={(e) => handleUploadVideo(e, 'opening')}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Upload 2 */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase text-neutral-450 tracking-wider flex justify-between items-center">
                      <span>{language === 'zh' ? '第二幕 • 交互循环背景影片' : 'ACT 2 • LOOP PLAYBACK BACKGROUND'}</span>
                      {hasCustomLooping && <span className="text-emerald-400 font-bold">● {language === 'zh' ? '已缓存' : 'STORED'}</span>}
                    </label>
                    <label className="flex items-center justify-between text-xs px-3.5 py-3.5 bg-neutral-900 border border-neutral-850 hover:border-emerald-500/40 rounded-xl transition-all cursor-pointer text-neutral-300">
                      <span className="truncate max-w-[240px] font-mono text-[11px] text-neutral-400">
                        {hasCustomLooping ? '✓ custom_loop_background.mp4' : 'default_movie.mp4'}
                      </span>
                      <Upload className="w-4 h-4 text-neutral-500" />
                      <input
                        type="file"
                        accept="video/mp4,video/quicktime,video/webm"
                        onChange={(e) => handleUploadVideo(e, 'looping')}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Config Buttons */}
                  <div className="pt-3 flex gap-3">
                    <button
                      onClick={resetVideosToDefault}
                      className="flex-1 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-mono tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer text-center"
                    >
                      {language === 'zh' ? '恢复默认配置' : 'Clear Storage'}
                    </button>
                    <button
                      onClick={() => setShowConfig(false)}
                      className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold tracking-wider transition-all cursor-pointer text-center"
                    >
                      {language === 'zh' ? '保存并关闭' : 'Secure & Close'}
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
