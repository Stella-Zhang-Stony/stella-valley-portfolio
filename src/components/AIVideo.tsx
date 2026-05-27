import { Play, Film, ExternalLink, HelpCircle, Laptop, Facebook, Aperture, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { aiVideoProjects, translations } from '../data';
import { Language } from '../types';

interface AIVideoProps {
  language: Language;
}

export default function AIVideo({ language }: AIVideoProps) {
  const t = translations[language];

  // Specific helper for Weixin/Facebook logo
  const getIcon = (type: 'wechat' | 'web' | 'facebook') => {
    switch (type) {
      case 'wechat':
        return <Aperture className="w-5 h-5 text-emerald-400 group-hover:rotate-90 transition-transform" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-blue-400" />;
      default:
        return <Laptop className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="aivideo" className="py-24 px-6 sm:px-12 bg-neutral-950 text-neutral-100 transition-colors duration-500 relative overflow-hidden">
      {/* Visual background cinematic mesh/noise */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1e2e_1px,transparent_1px)] [background-size:40px_40px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-left max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-emerald-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-450 font-bold">
              {language === 'zh' ? '数字先锋' : 'SYNTHETIC CINEMATOGRAPHY'}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-extrabold tracking-tight mb-4">
            {t.aiVideoTitle}
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-450 leading-relaxed max-w-2xl">
            {t.aiVideoDesc}
          </p>
        </div>

        {/* Featured Video Player Box (Simulated High-End Interface for her short film) */}
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/60 p-6 sm:p-10 mb-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Screen with Play Controls */}
            <div className="lg:col-span-7 relative group aspect-video bg-black rounded-2xl overflow-hidden border border-neutral-850 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=1200"
                alt="AI Short Film Poster Frame"
                className="w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-750"
              />
              {/* Cinematic Scanlines */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
              
              {/* Play overlays */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://weixin.qq.com/sph/AtTtPqEBN"
                  target="_blank"
                  rel="noreferrer referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 duration-300 relative group/play cursor-pointer"
                  id="play-button-sph"
                >
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-40 group-hover/play:opacity-60" />
                  <Play className="w-6 sm:w-8 h-6 sm:h-8 fill-black translate-x-0.5" />
                </a>
              </div>

              {/* Timecode overlay */}
              <div className="absolute bottom-4 left-4 font-mono text-xs text-neutral-400 bg-neutral-900/80 px-3 py-1.5 rounded-md border border-neutral-800 backdrop-blur-sm">
                REC • 01:24:08
              </div>

              <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded border border-emerald-500/20 backdrop-blur-sm">
                {language === 'zh' ? '在微信观看' : 'Watch on Weixin'}
              </div>
            </div>

            {/* Description Card Column */}
            <div className="lg:col-span-5 text-left flex flex-col justify-center h-full">
              <span className="text-[10px] font-mono tracking-[0.3em] text-emerald-500 font-bold uppercase mb-3">
                {language === 'zh' ? '主打 AI 作品' : 'FEATURED FILM'}
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                {language === 'zh' ? 'AI 概念短片：用喜鹊谋杀案的方式打开我的学校' : 'AI Concept Film: Opening My School in the Style of Magpie Murders'}
              </h3>
              <p className="font-sans text-sm text-neutral-450 leading-relaxed mb-6">
                {language === 'zh' 
                  ? 'AI 概念短片：用喜鹊谋杀案的方式打开我的学校。这是一次将古典英伦悬疑美学与现代校园空间融合的先锋尝试，运用前沿 AI 生成模型重塑视觉张力，欢迎在我的微信视频号深度查看流媒体作品。'
                  : 'An avant-garde visual-synthesis masterpiece that integrates classical suspenseful British aesthetics with modern university landscapes. Recreating cinematic narratives with cutting-edge generation pipelines.'
                }
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="https://weixin.qq.com/sph/AtTtPqEBN"
                  target="_blank"
                  rel="noreferrer referrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
                  id="watch-film-btn"
                >
                  <Film className="w-4 h-4" />
                  <span>{language === 'zh' ? '在微信视频号全屏观看' : 'Watch Fully on WeChat Sph'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Co-Founded Startup / Community Showcase Panel ("Aftershe" Studio) */}
        <div className="p-8 sm:p-12 rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-md relative overflow-hidden text-left mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold">
                  {language === 'zh' ? '加入初创团队' : 'STARTUP TEAM INITIATIVE'}
                </span>
              </div>
              <h3 className="font-display text-2xl font-extrabold text-white mb-3">
                {language === 'zh' ? 'AFTERSHE 视频艺术团队' : 'AFTERSHE Video Art Team'}
              </h3>
              <p className="font-sans text-sm md:text-base text-neutral-450 leading-relaxed">
                {language === 'zh' 
                  ? '我作为早期成员（实习生）加入了初创 AI 视频团队 AFTERSHE。团队专注于探索生成式 AI 视频与电影质感的深度融合，设计商业广告及先驱影像作品。欢迎访问我们的两个官方阵地：'
                  : 'I joined the startup AI video team AFTERSHE as an early member (intern). The team focuses on exploring the deep integration of generative AI video with cinematic textures, designing commercial advertisements and pioneering visual works. Welcome to visit our two official channels:'
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-4 shrink-0">
              <a
                href="https://www.aftershe.com"
                target="_blank"
                rel="noreferrer referrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 text-sm font-semibold transition-all cursor-pointer"
                id="aftershe-web-link"
              >
                <Laptop className="w-4 h-4 text-indigo-400" />
                <span>{language === 'zh' ? '访问官方网站' : 'Aftershe Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/share/1BFaqBJpnP/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer referrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-black hover:bg-neutral-200 text-sm font-semibold transition-all cursor-pointer"
                id="aftershe-fb-link"
              >
                <Facebook className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span>{language === 'zh' ? 'Facebook 展厅' : 'Facebook Page'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-black" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
