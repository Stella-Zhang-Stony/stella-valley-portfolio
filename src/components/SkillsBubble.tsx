import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, RotateCcw, Landmark, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { skillsBubbles, internshipsList, competitionsList, translations } from '../data';
import { Language, SkillBubble } from '../types';

interface SkillsBubbleProps {
  language: Language;
  selectedSkillId: string | null;
  setSelectedSkillId: (id: string | null) => void;
}

export default function SkillsBubble({ language, selectedSkillId, setSelectedSkillId }: SkillsBubbleProps) {
  const t = translations[language];
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  // Identify active skill
  const activeSkill = skillsBubbles.find(s => s.id === selectedSkillId);

  // Filter internship points matching the selected skill
  const getFilteredInternshipPoints = () => {
    if (!selectedSkillId) return [];
    
    const results: Array<{
      companyName: string;
      roleName: string;
      period: string;
      bulletText: string;
    }> = [];

    internshipsList.forEach(intern => {
      intern.points.forEach(point => {
        if (point.skills.includes(selectedSkillId)) {
          results.push({
            companyName: language === 'zh' ? intern.company.zh : intern.company.en,
            roleName: language === 'zh' ? intern.role.zh : intern.role.en,
            period: intern.period,
            bulletText: language === 'zh' ? point.zh : point.en,
          });
        }
      });
    });

    return results;
  };

  const filteredPoints = getFilteredInternshipPoints();

  // Floating keyframe presets for unique natural movement
  const floatAnimations = [
    { y: [0, -10, 0], x: [0, 5, 0], duration: 5 },
    { y: [0, 12, 0], x: [0, -8, 0], duration: 6 },
    { y: [0, -8, 0], x: [0, -6, 0], duration: 4.5 },
    { y: [0, 10, 0], x: [0, 8, 0], duration: 5.5 },
    { y: [0, -12, 0], x: [0, 6, 0], duration: 6.5 },
    { y: [0, 8, 0], x: [0, -4, 0], duration: 4 },
  ];

  return (
    <section id="skills" className="py-24 px-6 sm:px-12 bg-white dark:bg-[#141414] border-b border-gray-100 dark:border-neutral-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-left max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-emerald-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-500 font-bold">
              {language === 'zh' ? '专业赋能' : 'INTERACTIVE COMPETENCY'}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50 mb-4">
            {t.skillsTitle}
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t.skillsDesc}
          </p>
        </div>

        {/* Dynamic Bubble Interactive Stage */}
        <div className="relative min-h-[300px] md:min-h-[360px] bg-neutral-50 dark:bg-[#1b1b1b] rounded-3xl p-6 sm:p-10 mb-12 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center overflow-hidden transition-all">
          <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 to-transparent pointer-events-none opacity-40" />

          {/* Prompt Indicator */}
          <div className="absolute top-4 left-6 flex items-center gap-2 text-neutral-400 dark:text-neutral-500 select-none">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest">
              {selectedSkillId ? t.clickBubbleHint : t.clickBubbleHint}
            </span>
          </div>

          {/* Reset button inside stage when filter active */}
          {selectedSkillId && (
            <button
              onClick={() => setSelectedSkillId(null)}
              className="absolute top-4 right-6 z-20 flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-50 dark:hover:bg-neutral-200 text-neutral-50 dark:text-neutral-900 rounded-full font-sans text-xs font-semibold cursor-pointer shadow-md transition-all"
              id="skill-reset-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.viewAll}</span>
            </button>
          )}

          {/* Bubbles flex-grid cluster */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 max-w-5xl z-10 relative">
            {skillsBubbles.map((bubble, index) => {
              const isActive = selectedSkillId === bubble.id;
              const isHovered = hoveredSkillId === bubble.id;
              const anim = floatAnimations[index % floatAnimations.length];

              return (
                <motion.button
                  key={bubble.id}
                  onClick={() => setSelectedSkillId(bubble.id)}
                  onMouseEnter={() => setHoveredSkillId(bubble.id)}
                  onMouseLeave={() => setHoveredSkillId(null)}
                  className={`relative flex items-center gap-2.5 rounded-full px-6 py-4 border shadow-sm transition-all focus:outline-none cursor-pointer text-left
                    ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-bold scale-105 shadow-emerald-500/10'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300'
                    }
                  `}
                  animate={{
                    y: selectedSkillId ? 0 : anim.y,
                    x: selectedSkillId ? 0 : anim.x,
                    scale: isActive ? 1.05 : isHovered ? 1.03 : 1,
                    boxShadow: isActive
                      ? '0 10px 25px -5px rgba(16, 185, 129, 0.25)'
                      : isHovered
                      ? '0 8px 20px -6px rgba(0, 0, 0, 0.1)'
                      : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                  transition={{
                    y: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: anim.duration,
                      ease: "easeInOut",
                    },
                    x: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: anim.duration + 0.5,
                      ease: "easeInOut",
                    },
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  style={{
                    fontSize: `${13 + (bubble.size - 1) * 12}px`,
                  }}
                  id={`skill-bubble-${bubble.id}`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: bubble.color }}
                  />
                  <span>
                    {language === 'zh' ? bubble.name.zh : bubble.name.en}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Skill-to-Internship Outcomes Panels */}
        <AnimatePresence mode="wait">
          {selectedSkillId && (
            <motion.div
              key={selectedSkillId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-[#fcfcfc] dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 rounded-3xl p-6 sm:p-10 shadow-lg text-left"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-850 pb-5 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded font-bold">
                    {language === 'zh' ? '专才归纳' : 'Specialization Showcase'}
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-50 mt-2">
                    {language === 'zh' ? activeSkill?.name.zh : activeSkill?.name.en}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                    {language === 'zh' ? `匹配到 ${filteredPoints.length} 项成果` : `Found ${filteredPoints.length} matches`}
                  </span>
                </div>
              </div>

              {/* Render Filtered Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPoints.length > 0 ? (
                  filteredPoints.map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
                    >
                      <div className="mb-4">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <span className="text-xs font-semibold font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                            {pt.companyName}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                            {pt.period}
                          </span>
                        </div>
                        <h4 className="font-sans text-sm font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                          {pt.roleName}
                        </h4>
                        <p className="font-sans text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          {pt.bulletText}
                        </p>
                      </div>

                      <div className="flex justify-end pt-3 border-t border-neutral-100 dark:border-neutral-850/40">
                        <span className="text-[10px] font-mono text-emerald-400 dark:text-emerald-500 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{language === 'zh' ? '已核实产出' : 'Verified Output'}</span>
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-neutral-400">
                    {language === 'zh' ? '暂未在该分类划分具体成果' : 'No direct items registered under this specialty category.'}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
