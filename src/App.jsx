import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Modal from 'react-modal';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollToTop from './components/ScrollToTop';
import SectionIndicator from './components/SectionIndicator';
import LanguageSelector from './components/LanguageSelector';

// Configurar react-modal
Modal.setAppElement('#root');

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen text-white">
      <AnimatedBackground />
      <ScrollToTop />
      <SectionIndicator />
        <LanguageSelector />
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

        <Footer />
            </div>
    </I18nextProvider>
  );
}

export default App;
