import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, Star, Calendar } from 'lucide-react';
import { educationList, competitionsList, translations } from '../data';
import { Language } from '../types';

interface EducationProps {
  language: Language;
}

export default function Education({ language }: EducationProps) {
  const t = translations[language];

  return (
    <section id="about" className="py-24 px-6 sm:px-12 bg-white dark:bg-[#141414] border-b border-gray-100 dark:border-neutral-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Education Timelines */}
          <div className="lg:col-span-6 text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-emerald-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-500 font-bold">
                {language === 'zh' ? '学术基石' : 'ACADEMIC VINE'}
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50 mb-12">
              {t.educationTitle}
            </h2>

            <div className="space-y-12 relative border-l border-neutral-100 dark:border-neutral-800 ml-4 pl-6 sm:pl-8">
              {educationList.map((edu, idx) => (
                <div key={idx} className="relative text-left">
                  {/* Pin */}
                  <span className="absolute -left-[35px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white dark:border-[#141414] shadow" />

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-indigo-500 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </span>

                  <h3 className="font-sans text-xl font-bold text-neutral-950 dark:text-neutral-50 mb-1">
                    {language === 'zh' ? edu.school.zh : edu.school.en}
                  </h3>

                  <p className="font-sans text-sm font-semibold text-neutral-600 dark:text-neutral-300 mb-4">
                    {language === 'zh' ? edu.degree.zh : edu.degree.en}
                  </p>

                  <div className="bg-neutral-50 dark:bg-neutral-900/60 p-5 rounded-2xl border border-neutral-150/80 dark:border-neutral-800/80 space-y-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                        {t.gpa}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {edu.gpa}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                        {t.majorCourses}
                      </span>
                      <span className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
                        {language === 'zh' ? edu.courses.zh : edu.courses.en}
                      </span>
                    </div>

                    {edu.honors && (
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                          {language === 'zh' ? '核心成就' : 'KEY ACHIEVEMENTS'}
                        </span>
                        <span className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5 flex items-center gap-1.5">
                          <Star className="w-3 h-3 text-amber-500 shrink-0" />
                          <span>{language === 'zh' ? edu.honors.zh : edu.honors.en}</span>
                        </span>
                      </div>
                    )}
                    
                    {edu.otherSkills && (
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                          {t.otherSkills}
                        </span>
                        <span className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
                          {language === 'zh' ? edu.otherSkills.zh : edu.otherSkills.en}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Competitions & Modeling Achievements */}
          <div className="lg:col-span-6 text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-emerald-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-500 font-bold">
                {language === 'zh' ? '桂冠奖项' : 'MEDALLIST CAPABILITY'}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50 mb-12">
              {language === 'zh' ? '竞赛与数理研析' : 'Competitions & Modeling'}
            </h2>

            <div className="space-y-6">
              {competitionsList.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 hover:border-indigo-500/30 transition-all flex flex-col gap-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-150 dark:border-neutral-800/80 pb-3">
                    <span className="px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 rounded-full">
                      {comp.period}
                    </span>
                    <span className="font-semibold text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 uppercase tracking-wider">
                      <Award className="w-4 h-4" />
                      <span>{language === 'zh' ? comp.award.zh : comp.award.en}</span>
                    </span>
                  </div>

                  <div className="text-left">
                    <h3 className="font-sans text-base font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                      {language === 'zh' ? comp.name.zh : comp.name.en}
                    </h3>
                    
                    {comp.points.map((pt, ptIdx) => (
                      <p
                        key={ptIdx}
                        className="font-sans text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"
                      >
                        {language === 'zh' ? pt.zh : pt.en}
                      </p>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
