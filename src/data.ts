import { TranslationText, EducationItem, InternshipItem, CompetitionItem, SkillBubble, AIVideoProject } from './types';

export const translations: Record<'zh' | 'en', TranslationText> = {
  zh: {
    navWork: '主页作品',
    navAbout: '关于我',
    navSkills: '核心技能',
    navAIVideo: 'AI视频探索',
    navContact: '联络我',
    located: '位于',
    locationState: '中国 上海',
    role: '内容策略 / 策略运营 / 数据分析与AI创作者',
    aboutTitle: '张温雅',
    aboutIntro: '我是一名对数据极为敏感、深谙内容生态治理与策略运营的复合型人才。在字节跳动（Lemon8、TikTok）、携程及汇丰等头部企业完成了多项高价值的策略、风控及数据治理项目。同时，我是AI视频先锋创作者，作为初创视频团队核心，探索前沿AI生成视频并在主流平台传播。',
    aboutSecondary: '我擅长通过SQL、Python、A/B测试等定量工具实现数据洞察，并将其转化为实际落地的生态治理政策与增长模型。我追求极简主义的设计美学，将数据秩序感与数字创意的先锋意识完美融合。',
    educationTitle: '学历背景',
    internshipsTitle: '实习及实战经历',
    skillsTitle: '核心技能图谱',
    skillsDesc: '点击下方动态气泡，过滤或高亮显示我针对该项专业能力在各段实习及竞赛中的具体突出工作与学术产出。',
    aiVideoTitle: 'AI 视频艺术与探索',
    aiVideoDesc: '在前沿AI生成技术蓬勃发展的当下，我深度投身于AI短片与概念视频的创作。通过Midjourney、Runway、Luma、Sora等先锋生成式AI工具，探索音画同步与数字叙事的边界，并产出了一系列极具视觉张力的AI短片。欢迎查看我的作品和我们初创团队的官网。',
    aiTeamDetail: '我加入了一支充满活力的初创AI视频制作团队。在这里，我们重塑数字视觉时代的电影感与商业美学。',
    aiTeamLink: '初创视频团队 Web 官网',
    aiTeamDesc: '在 Facebook 和官网查看我们的先锋 AI 视频作品，共同见证 AI 给视觉创作带来的颠覆性变革。',
    contactTitle: '联络我',
    contactSubtitle: '对我的经历感兴趣？欢迎通过以下方式与我取得联系，随时期待与优秀的团队和创意碰撞。',
    contactName: '您的姓名',
    contactEmail: '电子邮箱',
    contactPhone: '联系电话',
    contactMessage: '留言内容',
    contactSubmit: '发送邮件 / 留言',
    contactSuccess: '感谢您的留言！我将尽快与您取得联系。',
    gpa: '绩点 (GPA)',
    majorCourses: '专业课程',
    honors: '所获荣誉',
    otherSkills: '其他技能',
    clickBubbleHint: '点击气泡按专业能力深度挖掘工作细节',
    viewAll: '显示全部工作细节',
    allSkills: '全部技能',
    internDetailTitle: '专业分工细节成果',
  },
  en: {
    navWork: 'Work Showcase',
    navAbout: 'About Me',
    navSkills: 'Core Skills',
    navAIVideo: 'AI Video Sandbox',
    navContact: 'Contact',
    located: 'Located in',
    locationState: 'Shanghai, China',
    role: 'Content Strategist / Strategy & Ops / Data Analyst & AI Creator',
    aboutTitle: 'Wenya Zhang',
    aboutIntro: 'I am a data-intelligent strategist specialized in content ecosystem governance, platform operations, and visual AI storytelling. Having worked at major market players like ByteDance (Lemon8, TikTok), Trip.com, and HSBC Fintech, I bridge quantitative analytics with operational leadership. I am also a pioneer in AI-assisted cinematography, driving experimental short films within a cutting-edge startup.',
    aboutSecondary: 'My approach combines deep data-driven problem solving (SQL, Python, A/B Testing) with elegant qualitative content policies. Rooted in Swiss minimalist aesthetic sensibilities, I value precise visual proportions, functional negative space, and dynamic interface transitions.',
    educationTitle: 'Education',
    internshipsTitle: 'Professional Internships',
    skillsTitle: 'Interactive Skill Mapping',
    skillsDesc: 'Click the dynamic bubbles below to isolate and view my specific high-impact contributions and operations categorized under that target specialty.',
    aiVideoTitle: 'AI Cinema & Creative Explorations',
    aiVideoDesc: 'Awestruck by the rapid evolution of generative models, I actively experiment with AI short films and cinematic trailers. Using prompt chains, image-to-video tools (Midjourney, Runway, Luma), and spatial soundscapes, I push the frontiers of synthetic storytelling. Explore my short clips, as well as our startup production house below.',
    aiTeamDetail: 'I joined a passionate, fast-paced startup AI video production team where we push the envelopes of cinematic pacing and advertisement aesthetics.',
    aiTeamLink: 'Startup Video Team Portal',
    aiTeamDesc: 'Explore our avant-garde portfolio on Facebook or visit our web catalog to witness how synthetic tools are redefining creative visual industries.',
    contactTitle: 'Get in Touch',
    contactSubtitle: 'Interested in a partnership or looking for a fast-moving, high-caliber strategist? Leave a message below.',
    contactName: 'Your Name',
    contactEmail: 'Email Address',
    contactPhone: 'Phone Number',
    contactMessage: 'Message',
    contactSubmit: 'Send Message',
    contactSuccess: 'Thank you! Your message has been received successfully.',
    gpa: 'GPA',
    majorCourses: 'Major Courses',
    honors: 'Honors & Awards',
    otherSkills: 'Other Skills / Certs',
    clickBubbleHint: 'Click on bubbles to filter specific work items by skill area',
    viewAll: 'Reset Filter',
    allSkills: 'All Specialties',
    internDetailTitle: 'Corresponding Scope of Work & Achievements',
  },
};

export const educationList: EducationItem[] = [
  {
    school: {
      zh: '上海财经大学 (SUFE)',
      en: 'Shanghai University of Finance and Economics',
    },
    degree: {
      zh: '硕士研究生，国际商务 (M.S. in International Business)',
      en: 'M.S. in International Business',
    },
    period: '2025.09 - 2028.06 (Expected)',
    gpa: '3.76 / 4.0 (Top 5%)',
    courses: {
      zh: '商务数据分析、西班牙语、国际贸易、财务报表分析',
      en: 'Business Data Analysis, Spanish Language, International Trade, Financial Statement Analysis',
    },
    honors: {
      zh: '国家英语四级 581，六级 573；雅思 (IELTS) 总分 7.0',
      en: 'CET-4: 581, CET-6: 573; IELTS Overall: 7.0',
    },
    otherSkills: {
      zh: '全国市场调查与分析专业技能证书、英语高级口译证书、西班牙语 (A1 级别)',
      en: 'National Market Survey & Analysis Professional Cert, Advanced English Oral Interpretation, Spanish (A1)',
    },
  },
  {
    school: {
      zh: '上海大学 (SHU)',
      en: 'Shanghai University',
    },
    degree: {
      zh: '学士学位，金融学 (B.S. in Finance)',
      en: 'B.S. in Finance',
    },
    period: '2021.09 - 2025.06',
    gpa: '3.84 / 4.0 (Top 5%)',
    courses: {
      zh: '统计学、计量经济学、概率论与数理统计、金融科技概论',
      en: 'Statistics, Econometrics, Probability & Mathematical Statistics, Introduction to FinTech',
    },
    honors: {
      zh: '学业优秀特等奖学金（院前 3%）、学业一等奖学金、创新创业奖学金、上海大学优秀毕业生',
      en: 'Grand Academic Scholarship (Top 3%), 1st Prize Academic Scholarship, Innovation and Entrepreneurship Scholarship, SHU Outstanding Graduate',
    },
  },
];

export const internshipsList: InternshipItem[] = [
  {
    id: 'lemon8',
    company: {
      zh: '字节跳动 - Lemon8 (美国市场)',
      en: 'ByteDance - Lemon8 (US Market)',
    },
    role: {
      zh: '内容策略实习生',
      en: 'Content Strategy Intern',
    },
    period: '2025.12 - 2026.05',
    points: [
      {
        zh: '负责美国地区社区核心生态指标（DAU、用户时长、深层互动）的日常监控与集成仪表盘搭建。',
        en: 'Owned US community ecosystem core indicators (DAU, duration, deep engagement) daily monitoring and integrated dashboard formulation.',
        skills: ['data-analytics'],
      },
      {
        zh: '针对用户时长及互动指标异常，建立快速归因与溯源分析的标准化作业流程 (SOP)。',
        en: 'Established quick attribution and root-cause diagnostic SOPs when tracking anomalies in user duration and interactive indices.',
        skills: ['data-analytics', 'strategy-ops'],
      },
      {
        zh: '基于长期用户价值 (LTV) 视角，协助撰写针对“软广、标题党、低能量无意义内容”的人工打分评估与限制政策，有效降低低质内容展现，实现用户负反馈数量下降 10%。',
        en: 'Drafted manual annotation policies targeting native ads, clickbait, and duplicate low-quality content from a long-term LTV perspective, lowering user negative complaints for spam content by 10%.',
        skills: ['strategy-ops', 'user-research'],
      },
      {
        zh: '熟练运用 SQL、Excel 及看板工具对大盘及留存数据进行深度拆解分析，出具高质量中英文周报、月报及专项分析报告，为业务策略迭代提供强力数据护航。',
        en: 'Leveraged complex SQL queries, advanced Excel models, and business intelligence suites to run deep-dive retention analyses, generating weekly/monthly briefings supporting strategic product decisions.',
        skills: ['data-analytics'],
      },
    ],
  },
  {
    id: 'tiktok',
    company: {
      zh: '字节跳动 - TikTok (菲律宾市场)',
      en: 'ByteDance - TikTok (Philippines Market)',
    },
    role: {
      zh: '策略运营实习生',
      en: 'Strategy & Operations Intern',
    },
    period: '2025.03 - 2025.07',
    points: [
      {
        zh: '主导并落地 25 家优质海外商家的定向圈选与扶持运营。通过黑白盒模型（算法模型诊断与人工样本标注相结合）与 8 维直播间质量识别标准，系统诊断并优化直播间健康度。',
        en: 'Led the targeting and operational incubation of 25 overseas high-growth merchants. Systematized live-room health scores combining black/white box algorithmic engines with manual asset audits across 8 quality dimensions.',
        skills: ['strategy-ops'],
      },
      {
        zh: '建立并跑通【中央监控 - 运营端 - 商家侧】的全链路问题预警与质量提升机制，推动直播间标准化运营流程 (SOP) 的输出。',
        en: 'Pioneered and automated a closed-loop incident pipeline spanning Central Monitors, Ops teams, and Merchants, outputting standardized live-room running guides (SOP).',
        skills: ['strategy-ops'],
      },
      {
        zh: '精细化人群策略与 A/B 测试：基于新老用户及消费力特征进行人群分层，规划包含对照组及 6 个实验组的多维度智能发券 A/B 策略设计（涵盖券面额、发放时机及靶向群体等变量）。',
        en: 'Formulated granular user clustering and smart couponing A/B setups. Coordinated experiments with raw controls and 6 test cells covering dynamic coupon values, timing triggers, and targeting parameters.',
        skills: ['data-analytics', 'strategy-ops'],
      },
      {
        zh: '精优策略验证：通过实验验证“针对女性、中等以上消费力、中年群体”的算法券方案效果最卓越，成功实现 GMV 环比拉升 8%，该推荐策略已成功并入日常长效运营大盘。',
        en: 'Proved custom coupon algorithms for female, high-intent, middle-aged demographics generated the absolute highest returns, driving an 8% MoM GMV lift and scaling into official everyday production pipelines.',
        skills: ['data-analytics', 'strategy-ops'],
      },
      {
        zh: '流量匹配极致优化：深入剖析内容流分发与直播电商算法逻辑，聚焦高转化率 (CVR > 10%) 兼高互动率 (Interaction > 5%) 的潜能直播间，推动优质房源曝光规模扩张 30%, 助力平台整体流量承载效率拉升近 10%。',
        en: 'Analyzed marketplace feed mechanics. Pinpointed high-conversion (CVR > 10%) and high-interaction (> 5%) rooms, scaling exposure by 30% and elevating overall platform traffic efficiency by ~10%.',
        skills: ['data-analytics', 'strategy-ops'],
      },
    ],
  },
  {
    id: 'ctrip',
    company: {
      zh: '携程集团 (东南亚度假市场)',
      en: 'Trip.com Group (SE Asia Vacations)',
    },
    role: {
      zh: '产品运营实习生',
      en: 'Product Operations Intern',
    },
    period: '2024.12 - 2025.02',
    points: [
      {
        zh: '深入调研吉隆坡 Skyline Luge（斜坡滑车）海外市场表现与旅客体验，以 Klook 等主流竞品为对标进行“全景剖析”（涉及前端展示信息、配套服务、价格弹性、分销与品牌策略等维度），输出系统化的产品优化及本地化运营建议。',
        en: 'Analyzed Kuala Lumpur Skyline Luge tourist sentiment, benchmarking Klook on UX cataloging, package elasticity, dynamic pricing, and brand visibility, outputting localized product-feature briefs.',
        skills: ['user-research', 'strategy-ops'],
      },
      {
        zh: '高强度跨团队沟通协调，作为业务与技术中间人，协助推进度假专属“买断囤票系统”成功上线发布，负责整理业务需求看板、撰写详实易懂的业务 PPT 操作手册、跟踪技术测试反馈，推动落地 3 次系统迭代。',
        en: 'Brokered inter-departmental requirements for secondary inventory pre-allocation systems. Transmitted engineering specifications into operational flowcharts, structured visual manuals, and consolidated customer issues to lead 3 rapid product releases.',
        skills: ['strategy-ops', 'user-research'],
      },
      {
        zh: '构建东南亚景区服务突发体系：主导搭建针对海外景区突发客诉及问题的“三级分类根因诊断机制”（覆盖沟通阻碍、售卖信息误导、景点供给缺失等 5 大核心类型），高时效处理 127 起紧急高危案件，深入探究高频问题成因，其中携程产品优化问题占比 38%（如景区公告滞后、异国退订模糊等描述缺陷），协同后台推动景区预警机制搭建，显著降低海外高危客诉率。',
        en: 'Structured a 3-level incident taxonomy evaluating SE Asia client touchpoints across 5 friction layers (translation blocks, misaligned descriptions, product outages). Triaged 127 extreme incident reviews, isolated critical Ctrip booking warnings on 38% of disputes, and automated safety buffers preventing high-end escalations.',
        skills: ['user-research'],
      },
    ],
  },
  {
    id: 'hsbc',
    company: {
      zh: '汇丰金融科技服务 (汇丰集团全资子公司)',
      en: 'HSBC Fintech (Wholly-owned subsidiary of HSBC Group)',
    },
    role: {
      zh: '风控策略实习生',
      en: 'Risk Strategy Intern',
    },
    period: '2024.06 - 2024.12',
    points: [
      {
        zh: '反欺诈防御规则搭建：主导多项线上保险产品异常行为与欺诈团伙排查。通过构建资金流偏离模型、异常访问聚集性分析、异常支付关联，成功输出 30+ 份细致入微的外资保司合规风控诊断与欺诈防堵建议案，大幅拓展风险拦截带宽。',
        en: 'Designed anti-fraud rules evaluating behavior profiles on insurtech assets. Analyzed fund velocities and multi-account correlations to draft 30+ risk advisory reports for international underwriters, reducing suspicious activity footprints.',
        skills: ['risk-compliance', 'data-analytics'],
      },
      {
        zh: '第三方合作风险看板落地：全方位对接及参与业务连续性计划 (BCP) 评审与跨国第三方供应商数字安全合规评估。牵头起草了多组风险指标分类评估体系并交付可视化仪表盘原型，让跨国合作风险指标以动态看板方式透明落地。',
        en: 'Established standardized risk scores tracking third-party suppliers and Business Continuity Planning (BCP). Built dynamic dashboards logging cybersecurity vulnerabilities and rating parameters, visualizing multi-vendor systemic exposures.',
        skills: ['risk-compliance', 'user-research'],
      },
      {
        zh: '公司数据合规性保障：协同 IT 合规团队与数据治理专家，对跨部门内训、测试及产品上线中的敏感数据流向进行“隐私沙盒式”安全筛查，极佳保障内外部数据合法合规性。',
        en: 'Audited internal microservices and training pipelines alongside IT Risk Teams to isolate sensitive customer info leakage vectors, supporting strict zero-trust corporate data compliance frameworks.',
        skills: ['risk-compliance'],
      },
    ],
  },
  {
    id: 'huachuan',
    company: {
      zh: '华创证券',
      en: 'HuaChuan Securities',
    },
    role: {
      zh: '行业研究实习生 (建筑材料组)',
      en: 'Equity Research & Industry Research Intern',
    },
    period: '2024.03 - 2024.06',
    points: [
      {
        zh: '使用 Wind 万得终端、财报及招股书进行基建/地产供应链核心上市公司（如旗滨集团、海螺水泥等）的基础面梳理与多维度量化分析，评估竞争格局和成长动能。',
        en: 'Utilized Wind Terminal, annual filings, and IPO prospectus documents to analyze fundamental financials of leading building material companies, evaluating market valuations and macroeconomic catalysts.',
        skills: ['modelling-finance', 'data-analytics'],
      },
      {
        zh: '针对特定细分和宏观产业现状，独立撰写深度行业剖析报告，涵盖宏观建筑政策传导率、材料市场供需拐点、盈利弹性测试及财务指标测度等。',
        en: 'Wrote investment reports on cement and industrial glass, containing structural policy analyses, supply-demand curves, raw material factor tests, and future equity outlook forecasts.',
        skills: ['modelling-finance'],
      },
    ],
  },
  {
    id: 'cls',
    company: {
      zh: '上海财联社金融科技',
      en: 'CLS Financial Technology (Financial News Agency Group)',
    },
    role: {
      zh: '内容运营与投教实习生',
      en: 'Content Operations & Investor Education Intern',
    },
    period: '2022.12 - 2023.06',
    points: [
      {
        zh: '内容质量管理与精准投放：运营并诊断财联社核心二级市场资讯平台，组织与编撰 20 余篇投资者核心投教与科普专题文章，全网累计触达 500k+ 强粘度投资者。',
        en: 'Facilitated core news portal moderation. Wrote 20+ specialized capital education columns and diagnostic updates, gaining over 500,000+ reads from high-net-worth active traders.',
        skills: ['strategy-ops'],
      },
      {
        zh: '运营漏斗诊断与增长赋能：基于获客、激活、转化、黏度及转介绍漏斗数据进行量化透视分析。针对 100+ 位核心客户，深层打磨调查问卷并汇总痛点卡阻点，有力指导资讯栏目交互与深度体验优化。',
        en: 'Designed funnel metrics diagnosing client life cycles (onboarding, conversion rates, referrals). Surveyed over 100 high-value readers in excel, detailing product bottlenecks and advising UX UI refinements.',
        skills: ['data-analytics', 'user-research'],
      },
    ],
  },
];

export const competitionsList: CompetitionItem[] = [
  {
    name: {
      zh: '美国大学生数学建模大赛 (MCM/ICM)',
      en: 'MCM/ICM Mathematical Contest in Modeling',
    },
    award: {
      zh: '国家级·二等奖 (National 2nd Prize)',
      en: 'National 2nd Prize',
    },
    period: '2024.02',
    points: [
      {
        zh: '建模团队核心担当。基于美国网球公开赛等数千场比赛波动数据，使用 SPSS、MATLAB 进行特征提取，使用逻辑回归与随机森林构建动态比赛运动员“Momentum 势头波动模型”。团队最终撰写了长达 27 页、超 9000 字的纯英文学术论文 《The Invisible Force in Tennis — Momentum》，并获得全球专家一致好评。',
        en: 'Pioneered momentum regression frameworks parsing 9,880 historic US Open tennis instances. Designed Random Forest and Logistic Regression algorithms in SPSS & MATLAB to map player psychological state fluctuations, finalizing a 27-page academic thesis titled "The Invisible Force in Tennis — Momentum".',
      },
    ],
  },
  {
    name: {
      zh: '全国大学生市场调查与分析大赛',
      en: 'National Market Survey and Analysis Competition',
    },
    award: {
      zh: '国家级·三等奖 (National 3rd Prize)',
      en: 'National 3rd Prize',
    },
    period: '2024.04',
    points: [
      {
        zh: '领导产品与市场问卷设计工作，编写系统样本偏差权重修正系数，深层诊断特定快消场景下消费力与复购率流失的核心心理要素。',
        en: 'Supervised client targeting logic and survey adjustments, designing structural weight metrics within excel models to analyze purchasing friction points for quick-moving household product landscapes.',
      },
    ],
  },
];

export const skillsBubbles: SkillBubble[] = [
  { id: 'data-analytics', name: { zh: '数据分析与定量建模', en: 'Data Analytics & SQL' }, color: '#38bdf8', size: 1.4 },
  { id: 'strategy-ops', name: { zh: '产品与策略业务运营', en: 'Platform Strategy & Ops' }, color: '#34d399', size: 1.3 },
  { id: 'risk-compliance', name: { zh: '风控合规与欺诈对冲', en: 'Risk & Fraud Shield' }, color: '#f87171', size: 1.25 },
  { id: 'user-research', name: { zh: '用户共情与竞品诊断', en: 'UX & Market Research' }, color: '#fbbf24', size: 1.2 },
  { id: 'modelling-finance', name: { zh: '量化建模与金融分析', en: 'Quant & Fin Research' }, color: '#a78bfa', size: 1.15 },
  { id: 'ai-creation', name: { zh: '先锋 AI 视频与创作', en: 'AI Creator Studio' }, color: '#fb7185', size: 1.2 },
];

export const aiVideoProjects: AIVideoProject[] = [
  {
    title: {
      zh: '【AI 短片】以喜鹊谋杀案的方式打开我的学校',
      en: '【AI Film】Opening My School in the Style of Magpie Murders',
    },
    desc: {
      zh: '这是一次突破维度的数字尝试，将古典悬疑色彩的喜鹊拼贴概念，与现代校园空间影像完美串联。',
      en: 'A suspenseful cinematic trailer blending contemporary university buildings with highly-stylized graphic motifs in a tribute to British noir.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=640&auto=format&fit=crop',
    link: 'https://weixin.qq.com/sph/AtTtPqEBN',
    type: 'wechat',
  },
  {
    title: {
      zh: '【AI 视频平台】 Aftershe 官方综合展厅',
      en: '【AI Video Portal】 Aftershe Official Web Catalog',
    },
    desc: {
      zh: '我联合创办并加入的初创视频团队，倾力打造充满想象力的商业级和电影级 AI 艺术大片。',
      en: 'The digital portal of the startup AI production house I joined, focused on high-fashion branding and cinematic synthesis.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=640&auto=format&fit=crop',
    link: 'https://www.aftershe.com',
    type: 'web',
  },
  {
    title: {
      zh: '【社交作品】 Aftershe Facebook 先锋社区作品',
      en: '【Community Feed】 Aftershe Facebook Portfolio',
    },
    desc: {
      zh: '在 Facebook 主页查看我们团队发布的最新 AI 概念短片与生成式电影作品，与全球数字先锋创作者互动。',
      en: 'Check out our freshly-rendered conceptual trailers and generative teasers inside our global active Facebook feed.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=640&auto=format&fit=crop',
    link: 'https://www.facebook.com/share/1BFaqBJpnP/?mibextid=wwXIfr',
    type: 'facebook',
  },
];
