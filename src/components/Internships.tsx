import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { internshipsList, skillsBubbles, translations } from '../data';
import { Language } from '../types';

interface InternshipsProps {
  language: Language;
  selectedSkillId: string | null;
}

export default function Internships({ language, selectedSkillId }: InternshipsProps) {
  const t = translations[language];

  return (
    <section id="work" className="py-24 px-6 sm:px-12 bg-neutral-50 dark:bg-[#1b1b1b] border-b border-neutral-200/60 dark:border-neutral-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-left max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-emerald-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-500 font-bold">
              {language === 'zh' ? '职业轨迹' : 'EXPERIENCE CHRONICLE'}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
            {t.internshipsTitle}
          </h2>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative border-l border-neutral-200 dark:border-neutral-800 ml-2 sm:ml-6 pl-6 sm:pl-10 space-y-16">
          {internshipsList.map((intern, index) => {
            // Check if any bullet in this internship matches selected skill
            const hasSkillMatch = selectedSkillId 
              ? intern.points.some(pt => pt.skills.includes(selectedSkillId))
              : false;

            return (
              <motion.div
                key={intern.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative group"
              >
                {/* Timeline Bullet Anchor Pin */}
                <span className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-5 h-5 rounded-full border-4 flex items-center justify-center transition-all duration-300
                  ${hasSkillMatch 
                    ? 'bg-emerald-500 border-emerald-400 dark:border-emerald-600 scale-125 ripple shadow-lg shadow-emerald-500/20' 
                    : 'bg-neutral-300 dark:bg-neutral-700 border-neutral-50 dark:border-[#1b1b1b] group-hover:bg-emerald-500 group-hover:border-emerald-300'
                  }
                `} />

                {/* Info Card Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Metadata (Company name & Period) */}
                  <div className="lg:col-span-4 text-left">
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{intern.period}</span>
                    </span>

                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-neutral-950 dark:text-neutral-50 leading-tight tracking-tight mb-2">
                      {language === 'zh' ? intern.company.zh : intern.company.en}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                      <Briefcase className="w-4 h-4 text-neutral-400" />
                      <span>{language === 'zh' ? intern.role.zh : intern.role.en}</span>
                    </div>
                  </div>

                  {/* Right Column: Achievements & Activities Bullet Points */}
                  <div className="lg:col-span-8 space-y-4">
                    {intern.points.map((point, ptIdx) => {
                      const isHighlighted = selectedSkillId ? point.skills.includes(selectedSkillId) : false;
                      const matchedSkillObj = isHighlighted 
                        ? skillsBubbles.find(s => s.id === selectedSkillId)
                        : null;

                      return (
                        <div
                          key={ptIdx}
                          className={`p-4 rounded-xl border transition-all duration-500 text-left relative overflow-hidden
                            ${isHighlighted 
                              ? 'border-emerald-500/40 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.03] shadow-inner shadow-emerald-500/5 translate-x-2'
                              : 'border-transparent bg-transparent hover:bg-neutral-100/45 dark:hover:bg-neutral-900/10'
                            }
                          `}
                        >
                          {/* Top indicator ribbon if matched */}
                          {isHighlighted && matchedSkillObj && (
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                                {language === 'zh' ? `匹配核心技能: ${matchedSkillObj.name.zh}` : `Matched Skill: ${matchedSkillObj.name.en}`}
                              </span>
                            </div>
                          )}

                          <div className="flex items-start gap-3">
                            <span className={`text-xs font-mono font-bold mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors
                              ${isHighlighted 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-neutral-250 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                              }
                            `}>
                              {ptIdx + 1}
                            </span>
                            <p className="font-sans text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                              {language === 'zh' ? point.zh : point.en}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
