import { motion } from 'motion/react';
import { Sun, Moon, Globe, Menu, X, Award, Briefcase, GraduationCap, Film, Phone } from 'lucide-react';
import { useState } from 'react';
import { translations } from '../data';
import { Language } from '../types';

interface NavigationProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navigation({ language, setLanguage, darkMode, toggleDarkMode }: NavigationProps) {
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav points
  const menuItems = [
    { name: t.navWork, href: '#work', icon: Briefcase },
    { name: t.navSkills, href: '#skills', icon: Award },
    { name: t.navAIVideo, href: '#aivideo', icon: Film },
    { name: t.navAbout, href: '#about', icon: GraduationCap },
    { name: t.navContact, href: '#contact', icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-[#141414]/70 border-b border-gray-200/50 dark:border-neutral-800/50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#hero" className="font-display font-bold text-lg md:text-xl tracking-tight text-neutral-900 dark:text-neutral-50 flex items-center gap-2 group">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="relative overflow-hidden inline-block whitespace-nowrap">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
              {language === 'zh' ? '张温雅' : 'WENYA ZHANG'}
            </span>
            <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-emerald-500">
              {language === 'zh' ? '作品集' : 'PORTFOLIO'}
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-50 transition-colors relative py-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Action Controls (Lang, Theme, Mobile Toggle) */}
        <div className="flex items-center gap-4">
          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all"
            aria-label="Toggle language"
            id="lang-toggle-btn"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'zh' ? 'EN' : '中文'}</span>
          </button>

          {/* Theme Switch */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all"
            aria-label="Toggle theme"
            id="theme-toggle-btn"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all"
            aria-label="Toggle mobile menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden w-full bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-neutral-800/70 p-6 shadow-2xl absolute left-0 top-20 flex flex-col gap-4 z-40 transition-colors duration-500"
        >
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-4 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:text-neutral-950 dark:hover:text-neutral-50 transition-all font-sans font-medium"
              >
                <IconComponent className="w-4 h-4 text-emerald-500" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </motion.div>
      )}
    </nav>
  );
}
