export type Language = 'zh' | 'en';

export interface TranslationText {
  navWork: string;
  navAbout: string;
  navSkills: string;
  navAIVideo: string;
  navContact: string;
  located: string;
  locationState: string;
  role: string;
  aboutTitle: string;
  aboutIntro: string;
  aboutSecondary: string;
  educationTitle: string;
  internshipsTitle: string;
  skillsTitle: string;
  skillsDesc: string;
  aiVideoTitle: string;
  aiVideoDesc: string;
  aiTeamDetail: string;
  aiTeamLink: string;
  aiTeamDesc: string;
  contactTitle: string;
  contactSubtitle: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactMessage: string;
  contactSubmit: string;
  contactSuccess: string;
  gpa: string;
  majorCourses: string;
  honors: string;
  otherSkills: string;
  clickBubbleHint: string;
  viewAll: string;
  allSkills: string;
  internDetailTitle: string;
}

export interface EducationItem {
  school: { zh: string; en: string };
  degree: { zh: string; en: string };
  period: string;
  gpa: string;
  courses: { zh: string; en: string };
  honors?: { zh: string; en: string };
  otherSkills?: { zh: string; en: string };
}

export interface InternshipItem {
  id: string; // unique identifier
  company: { zh: string; en: string };
  role: { zh: string; en: string };
  market?: { zh: string; en: string };
  period: string;
  points: {
    zh: string;
    en: string;
    skills: string[]; // list of skills this work point belongs to
  }[];
}

export interface CompetitionItem {
  name: { zh: string; en: string };
  award: { zh: string; en: string };
  period: string;
  points: {
    zh: string;
    en: string;
  }[];
}

export interface SkillBubble {
  id: string;
  name: { zh: string; en: string };
  color: string; // Tailwind hex color or class name
  size: number; // visual size factor
}

export interface AIVideoProject {
  title: { zh: string; en: string };
  desc: { zh: string; en: string };
  imageUrl: string;
  link: string;
  type: 'wechat' | 'facebook' | 'web';
}
