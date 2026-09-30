import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { worksData, workImage, workImageSrcSet } from '../data/works';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WorkDetail() {
  const { id } = useParams();
  const index = worksData.findIndex(w => w.id === id);
  const work = index >= 0 ? worksData[index] : undefined;
  const next = index >= 0 ? worksData[(index + 1) % worksData.length] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = work ? `${work.title} | Shane Xiao` : '作品未找到 | Shane Xiao';
    return () => {
      document.title = 'Shane Xiao | AI + 视觉设计师';
    };
  }, [id, work]);

  if (!work || !next) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="glass rounded-[2rem] px-10 py-12 text-center space-y-5">
          <h1 className="text-2xl font-semibold">作品未找到</h1>
          <Link to="/" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-black font-semibold text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>返回主页</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative z-10 max-w-5xl mx-auto px-5 md:px-6 pt-28 md:pt-36 pb-24 space-y-10">
      <Link
        to="/#work"
        className="glass inline-flex items-center gap-2 h-10 pl-3.5 pr-5 rounded-full text-[13px] font-medium text-white/75 hover:text-white active:scale-95 transition-transform"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>返回作品</span>
      </Link>

      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className="space-y-5"
      >
        <p className="text-[13px] font-semibold tracking-[0.06em] text-violet">{work.category}</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] leading-[1.05]">{work.title}</h1>
        <div className="flex flex-wrap gap-2 pt-1">
          {work.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-[12px] font-medium rounded-full bg-white/[0.06] ring-1 ring-inset ring-white/10 text-white/65">
              {tag}
            </span>
          ))}
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        className="glass rounded-[2.5rem] p-2.5"
      >
        <div className="aspect-video rounded-[2rem] overflow-hidden">
          <img
            src={workImage(work.image, 1600)}
            srcSet={workImageSrcSet(work.image)}
            sizes="(min-width: 1024px) 1024px, 100vw"
            width={1600}
            height={900}
            alt={work.title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-5 gap-5"
      >
        <section className="glass lg:col-span-3 rounded-[2rem] p-8 md:p-10 space-y-4">
          <h2 className="text-[13px] font-semibold tracking-[0.06em] text-white/40">项目概述</h2>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed tracking-tight">
            {work.description}
          </p>
        </section>

        <section className="glass lg:col-span-2 rounded-[2rem] p-8 md:p-10 space-y-5">
          <h2 className="text-[13px] font-semibold tracking-[0.06em] text-white/40">核心亮点</h2>
          <ul className="space-y-4">
            {work.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3 text-white/75 text-[15px] leading-relaxed">
                <span className="mt-0.5 w-5 h-5 rounded-full icon-tile flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </motion.div>

      {/* 下一个作品 */}
      <Link
        to={`/work/${next.id}`}
        className="glass group flex items-center gap-5 rounded-[2rem] p-2.5 pr-6 md:pr-8"
      >
        <div className="w-28 md:w-40 aspect-video rounded-[1.5rem] overflow-hidden shrink-0">
          <img
            src={workImage(next.image, 800)}
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-spring"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] text-white/45">下一个作品</p>
          <p className="text-lg md:text-xl font-semibold tracking-tight truncate">{next.title}</p>
        </div>
        <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform duration-500 ease-spring">
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </main>
  );
}
