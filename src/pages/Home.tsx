import React from 'react';
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
  Mail
} from 'lucide-react';
import { worksData } from '../data/works';

export default function Home() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-32 relative z-10">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter leading-[1.1]">
            塑造数字<br />
            叙事的<br />
            <span className="text-primary text-glow">未来。</span>
          </h1>
          <div className="space-y-4 max-w-xl">
            <p className="text-xl md:text-2xl font-medium text-on-surface/90">
              25届应届生，擅长AI+视觉呈现，具备全球视野，赋能海内外优质项目。
            </p>
            <p className="text-on-surface/60 leading-relaxed text-lg">
              通过将技术精准度与流动的创意探索相结合，将复杂的数据和抽象概念转化为沉浸式的数字体验。
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden glass-card p-2 relative group">
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>
            <img 
              src="/profile.png" 
              alt="Profile Portrait" 
              className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            
            {/* Location Tag */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="glass-card rounded-2xl p-4 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-on-surface/50 font-medium uppercase tracking-wider">当前据点</p>
                  <p className="text-sm font-semibold">武汉 // 数据互动</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Works Section */}
      <section id="work" className="space-y-12 pt-20">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-headline font-bold">精选作品</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-outline/50 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {worksData.map((work, i) => (
            <Link to={`/work/${work.id}`} key={work.id} className="block h-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer hover:-translate-y-2 transition-transform duration-500 h-full"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden glass-card mb-6 group-hover:shadow-[0_20px_40px_-15px_rgba(140,142,255,0.3)] transition-shadow duration-500">
                  <div className="absolute inset-0 bg-surface/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <div className="px-6 py-3 bg-surface/80 backdrop-blur-md rounded-full font-semibold text-sm flex items-center space-x-2">
                      <span>查看详情</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3 px-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">{work.title}</h3>
                    <span className="text-sm font-medium text-primary/80">{work.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag, j) => (
                      <span key={j} className="px-3 py-1 text-xs font-medium rounded-full border border-white/10 text-on-surface/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Design Philosophy */}
      <section id="about" className="space-y-12 pt-20">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-headline font-bold">设计哲学</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-outline/50 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Target className="w-6 h-6 text-primary" />,
              title: "迭代精度",
              desc: "卓越并非偶然。我采用严谨的迭代工作流，确保每一个像素、每一帧动画都达到最高标准。"
            },
            {
              icon: <Waves className="w-6 h-6 text-primary" />,
              title: "流体探索",
              desc: "媒介是动态的。我的创作方法拥抱数字工具的流动性，在不断变化的技术边界中寻找新的表达方式。"
            },
            {
              icon: <Heart className="w-6 h-6 text-primary" />,
              title: "人文共鸣",
              desc: "技术仅仅是载体。我们的目标始终是唤起内心深处的人文共鸣，创造有温度的数字体验。"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl space-y-6 hover:bg-surface-container-high transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-headline font-bold">{item.title}</h3>
              <p className="text-on-surface/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Career Milestones */}
      <section className="space-y-12">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-headline font-bold">职业里程碑</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-outline/50 to-transparent"></div>
        </div>

        <div className="relative border-l border-outline/30 ml-4 md:ml-6 space-y-16 pb-8">
          {[
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
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-10 md:pl-16"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary timeline-dot"></div>
              
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-semibold tracking-wider">
                  {item.date}
                </div>
                <h3 className="text-2xl font-headline font-bold">{item.role}</h3>
                <p className="text-on-surface/50 font-medium">{item.company}</p>
                <p className="text-on-surface/70 leading-relaxed max-w-2xl pt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Toolbox */}
      <section className="space-y-12">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-headline font-bold">工具箱</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-outline/50 to-transparent"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: "STABLE DIFFUSION", icon: <BrainCircuit className="w-6 h-6" /> },
            { name: "AFTER EFFECTS", icon: <Film className="w-6 h-6" /> },
            { name: "UNREAL ENGINE 5", icon: <Box className="w-6 h-6" /> },
            { name: "CINEMA 4D / 3DS MAX", icon: <Camera className="w-6 h-6" /> },
            { name: "FIGMA", icon: <Figma className="w-6 h-6" /> }
          ].map((tool, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/50 hover:bg-surface-container-high transition-all group"
            >
              <div className="text-on-surface/40 group-hover:text-primary transition-colors">
                {tool.icon}
              </div>
              <span className="text-xs font-bold tracking-widest text-on-surface/70 group-hover:text-on-surface transition-colors">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative rounded-[3rem] overflow-hidden liquid-gradient border border-white/5 py-24 px-6 pt-20">
        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tight text-glow">
              准备好策划<br />非凡的作品了吗？
            </h2>
            <p className="text-lg text-on-surface/70">
              目前接受2026年及以后的优质合作。无论是全职机会还是独立项目，让我们探讨您的愿景。
            </p>
            
            <div className="space-y-6 pt-8">
              <div className="flex items-center space-x-4 text-on-surface/80">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-on-surface/50 font-medium">发送邮件</p>
                  <p className="font-semibold">qingshan0313@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-on-surface/80">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-on-surface/50 font-medium">当前位置</p>
                  <p className="font-semibold">中国，武汉</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface/70">您的称呼</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-surface-container-high border border-white/5 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface/70">电子邮箱</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-surface-container-high border border-white/5 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface/70">项目简述</label>
                <textarea 
                  rows={4}
                  placeholder="请简要描述您的需求..."
                  className="w-full bg-surface-container-high border border-white/5 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                ></textarea>
              </div>
              <button className="w-full py-4 bg-primary text-surface font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center space-x-2 group">
                <span>发送信息</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
