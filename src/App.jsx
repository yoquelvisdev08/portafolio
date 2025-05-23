import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollToTop from './components/ScrollToTop';
import SectionIndicator from './components/SectionIndicator';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />
      <ScrollToTop />
      <SectionIndicator />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#6A9AB0] origin-left z-50"
        style={{ scaleX }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <div id="header">
          <Header />
        </div>
        <main className="container mx-auto px-4 py-8 max-w-5xl">
          {[
            { Component: About, id: 'about' },
            { Component: Experience, id: 'experience' },
            { Component: Skills, id: 'skills' },
            { Component: Projects, id: 'projects' },
            { Component: Education, id: 'education' },
            { Component: Contact, id: 'contact' }
          ].map(({ Component, id }, index) => (
            <div key={index} id={id}>
              <Component />
            </div>
          ))}
        </main>
      </motion.div>

      <footer className="mt-16 py-8 bg-gradient-to-r from-[#001F3F] via-[#3A6D8C] to-[#6A9AB0]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#EAD8B1] mb-4 md:mb-0">
              © 2025 Yoquelvis Jorge Abreu. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/yoquelvisdev08" className="text-[#EAD8B1] hover:text-[#6A9AB0] transition-colors">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/yoquelvis-jorge-abreu-5ba2a4234/" className="text-[#EAD8B1] hover:text-[#6A9AB0] transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="mailto:yoquelvis18@gmail.com" className="text-[#EAD8B1] hover:text-[#6A9AB0] transition-colors">
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
