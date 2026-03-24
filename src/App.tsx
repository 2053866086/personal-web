/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import InteractiveBackground from './components/InteractiveBackground';
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

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <ScrollToHash />
      <div className="min-h-screen bg-surface text-on-surface font-body overflow-x-hidden selection:bg-primary/30 selection:text-primary relative">
        <InteractiveBackground />
        {/* Liquid Glass Background Blobs */}
        <div className="liquid-blob w-[500px] h-[500px] bg-primary/20 rounded-full top-[-100px] left-[-100px]"></div>
        <div className="liquid-blob w-[600px] h-[600px] bg-indigo-500/10 rounded-full bottom-[20%] right-[-200px]" style={{ animationDelay: '-5s' }}></div>
        <div className="liquid-blob w-[400px] h-[400px] bg-purple-500/10 rounded-full top-[40%] left-[20%]" style={{ animationDelay: '-10s' }}></div>

        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="/" className="font-headline font-bold text-xl tracking-wider">SHANE XIAO</a>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-on-surface/70">
              <a href="/" className="hover:text-primary transition-colors">主页</a>
              <a href="/#work" className="hover:text-primary transition-colors">作品</a>
              <a href="/#contact" className="hover:text-primary transition-colors">联系</a>
            </div>
            <a href="/#contact" className="px-6 py-2.5 bg-primary text-surface font-semibold rounded-full hover:bg-white transition-colors text-sm">
              Hire Me
            </a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<WorkDetail />} />
        </Routes>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-headline font-bold text-xl tracking-wider text-on-surface/50">SHANE XIAO</div>
            <div className="flex items-center space-x-6 text-sm font-medium text-on-surface/40">
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">Dribbble</a>
            </div>
            <div className="text-sm text-on-surface/30">
              &copy; {new Date().getFullYear()} Shane Xiao. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: showScrollTop ? 1 : 0, 
            scale: showScrollTop ? 1 : 0.5,
            pointerEvents: showScrollTop ? 'auto' : 'none'
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-primary text-surface rounded-full shadow-lg shadow-primary/30 hover:bg-white hover:scale-110 transition-all duration-300"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      </div>
    </Router>
  );
}
