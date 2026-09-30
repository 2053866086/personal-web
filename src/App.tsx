/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import AmbientBackground from './components/AmbientBackground';
import { useGlassSpotlight } from './hooks/useGlassSpotlight';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  return null;
}

const NAV_ITEMS = [
  { id: 'top', label: '主页', to: '/' },
  { id: 'work', label: '作品', to: '/#work' },
  { id: 'contact', label: '联系', to: '/#contact' },
];

// 悬浮的胶囊导航，当前所在区块会有一块滑动的玻璃高亮
function Nav({ scrolled }: { scrolled: boolean }) {
  const location = useLocation();
  const [active, setActive] = useState('top');

  useEffect(() => {
    if (location.pathname !== '/') {
      setActive('work');
      return;
    }
    const sections = ['work', 'contact']
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const onScroll = () => {
      const probe = window.innerHeight * 0.4;
      let current = 'top';
      for (const el of sections) {
        if (el.getBoundingClientRect().top < probe) current = el.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  return (
    <header className="fixed top-3 md:top-5 inset-x-0 z-50 px-3 md:px-6">
      <nav
        className={`glass ${scrolled ? 'glass-strong' : ''} mx-auto max-w-5xl rounded-full h-14 pl-5 pr-2 flex items-center justify-between transition-[background] duration-500`}
      >
        <Link to="/" className="font-semibold tracking-tight text-[15px] text-white">
          Shane Xiao
        </Link>

        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.id}
              to={item.to}
              aria-current={active === item.id ? 'page' : undefined}
              className={`relative px-3.5 md:px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-300 ${
                active === item.id ? 'text-white' : 'text-white/55 hover:text-white'
              }`}
            >
              {active === item.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </Link>
          ))}
          <Link
            to="/#contact"
            className="hidden sm:inline-flex ml-2 items-center h-10 px-5 rounded-full bg-white text-black text-[13px] font-semibold hover:bg-white/85 active:scale-95 transition-all duration-300"
          >
            Hire Me
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Shell() {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useGlassSpotlight();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 600);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-clip selection:bg-violet/40 selection:text-white">
      <ScrollToHash />
      <AmbientBackground />
      <Nav scrolled={scrolled} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:id" element={<WorkDetail />} />
      </Routes>

      <footer className="relative z-10 max-w-6xl mx-auto px-6 pb-10">
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-white/40">
          <div>&copy; {new Date().getFullYear()} Shane Xiao</div>
          <div className="flex items-center gap-6">
            <a href="mailto:qingshan0313@gmail.com" className="hover:text-white transition-colors">Email</a>
            <a href="https://github.com/2053866086" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="回到顶部"
            className="glass glass-strong fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white/85 hover:text-white active:scale-90 transition-transform"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Shell />
    </Router>
  );
}
