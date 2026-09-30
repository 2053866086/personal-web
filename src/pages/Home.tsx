import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Target,
  Waves,
  Heart,
  BrainCircuit,
  Film,
  Box,
  Camera,
  Figma,
  ArrowRight,
  ArrowUpRight,
  Mail,
  CheckCircle,
  Loader2,
  Play
} from 'lucide-react';
import { worksData, workImage, workImageSrcSet, mediaBadge } from '../data/works';

// 统一的入场动画：轻微上浮 + 淡入，Apple 常用的弹性缓动
const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease: EASE, delay },
});

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div {...reveal()} className="space-y-3">
      <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-white/40">{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.015em]">{title}</h2>
    </motion.div>
  );
}

const PHILOSOPHY = [
  {
    icon: Target,
    title: "迭代精度",
    desc: "卓越并非偶然。我采用严谨的迭代工作流，确保每一个像素、每一帧动画都达到最高标准。"
  },
  {
    icon: Waves,
    title: "流体探索",
    desc: "媒介是动态的。我的创作方法拥抱数字工具的流动性，在不断变化的技术边界中寻找新的表达方式。"
  },
  {
    icon: Heart,
    title: "人文共鸣",
    desc: "技术仅仅是载体。我们的目标始终是唤起内心深处的人文共鸣，创造有温度的数字体验。"
  }
];

const MILESTONES = [
  {
    date: "2026.3 — 至今",
    role: "海外增长视频设计师",
    company: "北京数驱互动科技有限公司",
    desc: "运用各类AI工具，Figma To AE工作流制作精良视频，赋能海外市场增长。"
  },
  {
    date: "2025.3 — 2026.2",
    role: "新媒体专家",
    company: "武汉纵达骐家房地产经纪有限公司",
    desc: "0-1创作多个百万级播放量作品，成功打造10W+粉丝IP矩阵。"
  },
  {
    date: "2024.6 — 2024.8",
    role: "虚幻引擎地图编辑",
    company: "独立项目 / 实习",
    desc: "使用虚幻5引擎制作引人入胜的游戏画面与场景构建。"
  }
];

const TOOLS = [
  { name: "Stable Diffusion", icon: BrainCircuit },
  { name: "After Effects", icon: Film },
  { name: "Unreal Engine 5", icon: Box },
  { name: "Cinema 4D / 3ds Max", icon: Camera },
  { name: "Figma", icon: Figma }
];

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('form-name', 'contact');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <main className="relative z-10 max-w-6xl mx-auto px-5 md:px-6 pt-32 md:pt-40 pb-24 space-y-32 md:space-y-44">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="glass inline-flex items-center gap-2.5 rounded-full pl-3 pr-4 py-1.5 text-[13px] text-white/75"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-apple-green animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-apple-green" />
            </span>
            开放 2026 年合作机会
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.08 }}
            className="text-[3.4rem] leading-[1.02] sm:text-7xl lg:text-[6.5rem] font-bold tracking-[-0.02em]"
          >
            塑造数字<br />
            叙事的<br />
            <span className="text-gradient">未来。</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="space-y-4 max-w-xl"
          >
            <p className="text-xl md:text-2xl font-medium tracking-tight text-white/90 leading-snug">
              25届应届生，擅长AI+视觉呈现，具备全球视野，赋能海内外优质项目。
            </p>
            <p className="text-white/50 leading-relaxed text-[17px]">
              通过将技术精准度与流动的创意探索相结合，将复杂的数据和抽象概念转化为沉浸式的数字体验。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-black font-semibold text-[15px] hover:bg-white/85 active:scale-95 transition-all duration-300"
            >
              查看作品
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/#contact"
              className="glass inline-flex items-center h-12 px-7 rounded-full font-semibold text-[15px] text-white/90 hover:text-white active:scale-95 transition-transform duration-300"
            >
              联系我
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
          className="lg:col-span-5 relative"
        >
          {/* 头像背后的彩色光晕，透过玻璃边框能看到 */}
          <div className="absolute -top-16 -left-20 w-[80%] aspect-square -z-10 bg-[radial-gradient(closest-side,rgba(110,80,210,0.4),transparent)]" />
          <div className="absolute -bottom-16 -right-20 w-[80%] aspect-square -z-10 bg-[radial-gradient(closest-side,rgba(74,53,145,0.45),transparent)]" />

          <div className="glass rounded-[2.5rem] p-2.5 group">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
              <img
                src="/images/profile-600.webp"
                srcSet="/images/profile-600.webp 600w, /images/profile-1000.webp 1000w"
                sizes="(min-width: 1024px) 40vw, 90vw"
                width={600}
                height={799}
                fetchPriority="high"
                alt="Shane Xiao 肖像"
                className="w-full h-full object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-[1.4s] ease-spring"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Location Tag */}
              <div className="glass glass-strong absolute bottom-4 left-4 right-4 rounded-[1.4rem] p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full icon-tile flex items-center justify-center shrink-0">
                  <MapPin className="w-[18px] h-[18px] text-white" />
                </div>
                <div className="leading-tight">
                  <p className="text-[11px] text-white/50 font-medium tracking-wide">当前据点</p>
                  <p className="text-[15px] font-semibold">武汉 · 数据互动</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Works Section */}
      <section id="work" className="space-y-12 scroll-mt-28">
        <SectionHeader eyebrow="Selected Work" title="精选作品" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {worksData.map((work, i) => (
            <motion.div key={work.id} {...reveal((i % 2) * 0.08)}>
              <Link
                to={`/work/${work.id}`}
                className="glass group block rounded-[2rem] p-2.5 hover:-translate-y-1.5 transition-transform duration-700 ease-spring"
              >
                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden">
                  <img
                    src={workImage(work.image, 800)}
                    srcSet={workImageSrcSet(work.image)}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1.2s] ease-spring"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="glass glass-strong absolute top-3 left-3 rounded-full px-3 py-1 text-[12px] font-medium text-white/90">
                    {work.category}
                  </span>
                  <span className="glass glass-strong absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-spring">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                  {/* 有视频的作品显示时长，提示可以播放 */}
                  {mediaBadge(work) && (
                    <span className="glass glass-strong absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full pl-2 pr-3 py-1 text-[12px] font-medium text-white/90 tabular-nums">
                      <Play className="w-3 h-3 fill-white" />
                      {mediaBadge(work)}
                    </span>
                  )}
                </div>
                <div className="px-4 pt-5 pb-4 space-y-3">
                  <h3 className="text-[22px] font-semibold tracking-tight">{work.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-[12px] font-medium rounded-full bg-white/[0.06] ring-1 ring-inset ring-white/10 text-white/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Design Philosophy */}
      <section id="about" className="space-y-12 scroll-mt-28">
        <SectionHeader eyebrow="Philosophy" title="设计哲学" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PHILOSOPHY.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} {...reveal(i * 0.08)} className="h-full">
              <div className="glass h-full rounded-[2rem] p-8 space-y-5">
                <div className={`w-12 h-12 rounded-2xl icon-tile flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                <p className="text-white/55 leading-relaxed text-[15px]">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Career Milestones */}
      <section className="space-y-12">
        <SectionHeader eyebrow="Experience" title="职业里程碑" />

        <motion.div {...reveal()}>
          <div className="glass rounded-[2rem] px-6 md:px-10 divide-y divide-white/[0.08]">
            {MILESTONES.map((item, i) => (
              <div key={item.role} className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8">
                <div className="md:col-span-3 flex md:block items-center gap-3">
                  <span className={`inline-block text-[13px] font-semibold tabular-nums ${i === 0 ? 'text-violet' : 'text-white/45'}`}>
                    {item.date}
                  </span>
                  {i === 0 && (
                    <span className="inline-flex md:flex md:mt-2 w-fit items-center gap-1.5 text-[11px] font-medium text-violet bg-violet/10 ring-1 ring-inset ring-violet/25 rounded-full px-2 py-0.5">
                      在职
                    </span>
                  )}
                </div>
                <div className="md:col-span-9 space-y-1.5">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{item.role}</h3>
                  <p className="text-white/45 text-[15px]">{item.company}</p>
                  <p className="text-white/70 leading-relaxed pt-2 max-w-2xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Toolbox */}
      <section className="space-y-12">
        <SectionHeader eyebrow="Toolbox" title="工具箱" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {TOOLS.map(({ name, icon: Icon }, i) => (
            <motion.div key={name} {...reveal(i * 0.05)}>
              <div className="glass group rounded-[1.75rem] p-6 flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-transform duration-500 ease-spring">
                {/* 做成 App 图标的样子 */}
                <div className={`w-14 h-14 rounded-[1.1rem] icon-tile flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-spring`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-[13px] font-medium text-white/75 leading-tight">{name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-28">
        <motion.div {...reveal()} className="relative">
          <div className="absolute -left-20 top-0 w-[55%] aspect-square -z-10 bg-[radial-gradient(closest-side,rgba(110,80,210,0.28),transparent)]" />
          <div className="absolute -right-20 bottom-0 w-[50%] aspect-square -z-10 bg-[radial-gradient(closest-side,rgba(74,53,145,0.3),transparent)]" />
          <div className="glass rounded-[2.5rem] p-6 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-white/40">Contact</p>
              <h2 className="text-4xl md:text-[3.4rem] leading-[1.08] font-bold tracking-[-0.02em]">
                准备好策划<br /><span className="text-gradient">非凡的作品</span>了吗？
              </h2>
              <p className="text-[17px] text-white/55 leading-relaxed">
                目前接受2026年及以后的优质合作。无论是全职机会还是独立项目，让我们探讨您的愿景。
              </p>

              <div className="space-y-3 pt-4">
                <a
                  href="mailto:qingshan0313@gmail.com"
                  className="glass flex items-center gap-4 rounded-[1.4rem] p-3 pr-5 hover:bg-white/[0.08] transition-colors group"
                >
                  <div className="w-11 h-11 rounded-full icon-tile flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-white/45">发送邮件</p>
                    <p className="font-semibold truncate">qingshan0313@gmail.com</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </a>
                <div className="glass flex items-center gap-4 rounded-[1.4rem] p-3 pr-5">
                  <div className="w-11 h-11 rounded-full icon-tile flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[12px] text-white/45">当前位置</p>
                    <p className="font-semibold">中国，武汉</p>
                  </div>
                </div>
              </div>
            </div>

            <form name="contact" method="POST" className="space-y-5 lg:pt-10" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden" aria-hidden="true"><label>Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-[13px] font-medium text-white/60 pl-1">您的称呼</label>
                <input
                  id="contact-name"
                  autoComplete="name"
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="field"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-[13px] font-medium text-white/60 pl-1">电子邮箱</label>
                <input
                  id="contact-email"
                  autoComplete="email"
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="field"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-[13px] font-medium text-white/60 pl-1">项目简述</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="请简要描述您的需求..."
                  className="field resize-none"
                ></textarea>
              </div>

              <div aria-live="polite">
              {formStatus === 'success' && (
                <div className="flex items-center gap-2 text-apple-green bg-apple-green/10 ring-1 ring-inset ring-apple-green/25 rounded-2xl px-4 py-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">信息已发送成功！我会尽快回复您。</span>
                </div>
              )}
              {formStatus === 'error' && (
                <div className="text-apple-red bg-apple-red/10 ring-1 ring-inset ring-apple-red/25 rounded-2xl px-4 py-3 text-sm font-medium">
                  发送失败，请稍后再试或直接发送邮件。
                </div>
              )}
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full h-13 py-3.5 rounded-full bg-white text-black font-semibold text-[15px] hover:bg-white/85 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formStatus === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>发送中...</span>
                  </>
                ) : (
                  <>
                    <span>发送信息</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
