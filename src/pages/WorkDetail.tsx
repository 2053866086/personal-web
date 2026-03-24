import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { worksData } from '../data/works';

export default function WorkDetail() {
  const { id } = useParams();
  const work = worksData.find(w => w.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">作品未找到</h1>
          <Link to="/" className="text-primary hover:underline flex items-center justify-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>返回主页</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16 relative z-10">
      <Link to="/" className="inline-flex items-center space-x-2 text-on-surface/60 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>返回主页</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold">{work.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-primary font-medium">{work.category}</span>
            <div className="flex flex-wrap gap-2">
              {work.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full border border-white/10 text-on-surface/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="aspect-video rounded-3xl overflow-hidden glass-card">
          <img 
            src={work.image} 
            alt={work.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="glass-card p-8 md:p-12 rounded-3xl space-y-8">
          <h2 className="text-2xl font-headline font-bold">项目概述</h2>
          <p className="text-lg text-on-surface/80 leading-relaxed">
            {work.description}
          </p>
          
          <h3 className="text-xl font-headline font-bold pt-4">核心亮点</h3>
          <ul className="space-y-4">
            {work.details.map((detail, i) => (
              <li key={i} className="flex items-start space-x-3 text-on-surface/80">
                <span className="text-primary mt-1">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
