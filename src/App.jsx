import React from 'react';
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
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
import ThreeBackground from './components/ThreeBackground';
import ScrollToTop from './components/ScrollToTop';
import SectionIndicator from './components/SectionIndicator';
import LanguageSelector from './components/LanguageSelector';
import SEOHead from './components/SEOHead';
import { Analytics } from '@vercel/analytics/react';
import PwaUpdateToast from './components/PwaUpdateToast';

Modal.setAppElement('#root');

function App() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const progressValue = shouldReduceMotion ? scrollYProgress : smoothProgress;

  const sections = [
    { Component: About, id: 'about' },
    { Component: Experience, id: 'experience' },
    { Component: Skills, id: 'skills' },
    { Component: Projects, id: 'projects' },
    { Component: Education, id: 'education' },
    { Component: Contact, id: 'contact' },
  ];

  return (
    <I18nextProvider i18n={i18n}>
      <MotionConfig reducedMotion="user">
        <SEOHead />
        <div className="min-h-screen bg-gradient-to-b from-[#071628] via-[#0b2744] to-[#081426] text-white">
          <ThreeBackground />
          <ScrollToTop />
          <SectionIndicator />
          <LanguageSelector />

          <motion.div
            className="fixed left-0 right-0 top-0 z-[80] h-1.5 origin-left bg-gradient-to-r from-[#6A9AB0] via-[#9ac0cf] to-[#EAD8B1] shadow-[0_6px_18px_rgba(106,154,176,0.45)]"
            style={{ scaleX: progressValue }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div id="header">
              <Header />
            </div>
            <main className="container mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6 lg:px-8" id="main-content">
              {sections.map(({ Component, id }) => (
                <section
                  key={id}
                  id={id}
                  className="scroll-mt-20"
                >
                  <Component />
                </section>
              ))}
            </main>
          </div>

          <Footer />
          <PwaUpdateToast />
          <Analytics />
        </div>
      </MotionConfig>
    </I18nextProvider>
  );
}

export default App;
