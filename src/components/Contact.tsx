import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle, Copy, Check } from 'lucide-react';
import { translations } from '../data';
import { Language } from '../types';

interface ContactProps {
  language: Language;
}

export default function Contact({ language }: ContactProps) {
  const t = translations[language];
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copyState, setCopyState] = useState<'none' | 'email' | 'phone' | 'wechat'>('none');

  // Exact contact channels
  const contactChannels = [
    {
      id: 'email' as const,
      label: language === 'zh' ? '官方电子邮箱' : 'Direct Email',
      value: 'zwy2588867@gmail.com',
      subtext: language === 'zh' ? '随时通过邮件获取完整 CV' : 'Request complete resume via email',
      actionLabel: language === 'zh' ? '复制邮箱' : 'Copy Email',
      icon: Mail,
      href: 'mailto:zwy2588867@gmail.com',
    },
    {
      id: 'wechat' as const,
      label: language === 'zh' ? '微信平台与网络' : 'WeChat / LinkedIn',
      value: 'Stella_Zhang11',
      subtext: language === 'zh' ? '添加微信咨询合作与详情' : 'Add on WeChat to collaborate',
      actionLabel: language === 'zh' ? '复制微信' : 'Copy ID',
      icon: MessageSquare,
      href: '#',
    },
  ];

  // Handle Copy text
  const handleCopy = (text: string, id: 'email' | 'phone' | 'wechat', e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopyState(id);
    setTimeout(() => setCopyState('none'), 2000);
  };

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', phone: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-12 bg-neutral-100 dark:bg-[#1a1a1a] transition-colors duration-500 text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-left max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-emerald-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-500 font-bold">
              {language === 'zh' ? '同频共振' : 'SYNC UP'}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50 mb-4">
            {t.contactTitle}
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t.contactSubtitle}
          </p>
        </div>

        {/* Channels + Message Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Exactly 3 Contact Cards Layout */}
          <div className="lg:col-span-5 space-y-6">
            {contactChannels.map((chan) => {
              const IconComp = chan.icon;
              const isCopied = copyState === chan.id;

              return (
                <div
                  key={chan.id}
                  className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block">
                        {chan.label}
                      </span>
                      <span className="text-sm sm:text-base font-bold font-sans text-neutral-800 dark:text-neutral-100 mt-1 block select-all">
                        {chan.value}
                      </span>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {chan.subtext}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-850 justify-end">
                    {chan.id === 'email' && (
                      <a
                        href={chan.href}
                        className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer mr-3"
                        id={`contact-action-link-${chan.id}`}
                      >
                        <span>{language === 'zh' ? '在线发信' : 'Email Now'}</span>
                      </a>
                    )}
                    <button
                      onClick={(e) => handleCopy(chan.value, chan.id, e)}
                      className={`text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer
                        ${isCopied ? 'text-emerald-500' : 'text-indigo-500 hover:text-indigo-400'}
                      `}
                      id={`contact-action-copy-${chan.id}`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{language === 'zh' ? '已复制' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{chan.actionLabel}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Minimal Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-sm h-full flex flex-col justify-between">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                      {language === 'zh' ? '在线备忘留言' : 'Drop a Quick Note'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="flex flex-col text-left">
                        <label className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5 font-bold">
                          {t.contactName}
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder={language === 'zh' ? '谢先生' : 'Alex Mercer'}
                          className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 font-sans text-sm focus:outline-none focus:border-emerald-500 dark:text-white"
                          id="contact-form-name"
                        />
                      </div>

                      <div className="flex flex-col text-left">
                        <label className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5 font-bold">
                          {t.contactEmail}
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="client@enterprise.com"
                          className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 font-sans text-sm focus:outline-none focus:border-emerald-500 dark:text-white"
                          id="contact-form-email"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col text-left mb-6">
                      <label className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5 font-bold">
                        {t.contactPhone}
                      </label>
                      <input
                        type="text"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+86 / +1"
                        className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 font-sans text-sm focus:outline-none focus:border-emerald-500 dark:text-white"
                        id="contact-form-phone"
                      />
                    </div>

                    <div className="flex flex-col text-left">
                      <label className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5 font-bold">
                        {t.contactMessage}
                      </label>
                      <textarea
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder={language === 'zh' ? '有什么可以帮到您的？' : 'How can Wenya help drive insights for your team?'}
                        className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 font-sans text-sm focus:outline-none focus:border-emerald-500 dark:text-white resize-none"
                        id="contact-form-msg"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 py-4 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200 cursor-pointer flex items-center justify-center gap-2 shadow"
                    id="contact-submit-btn"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.contactSubmit}</span>
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 flex-1">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                    {language === 'zh' ? '发送邮件成功！' : 'Message Transmitted Successfully!'}
                  </h3>
                  <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mb-6">
                    {t.contactSuccess}
                  </p>
                  <span className="text-[10px] font-mono text-neutral-300 dark:text-neutral-600 uppercase tracking-widest">
                    {language === 'zh' ? '3秒后自动重置表单' : 'Resetting panel in 3s'}
                  </span>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Footer info line */}
        <div className="mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
            © 2026 Wenya Zhang. Styled like Dennis Snellenberg.
          </span>
          <div className="flex gap-4 font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
            <a href="#hero" className="hover:text-neutral-900 dark:hover:text-neutral-50">Back to Top</a>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>

      </div>
    </section>
  );
}
