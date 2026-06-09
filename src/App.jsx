import React from 'react';
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Modal from 'react-modal';
import { ThemeProvider } from './context/ThemeContext';
import NavBar from './components/NavBar';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SectionIndicator from './components/SectionIndicator';
import LanguageSelector from './components/LanguageSelector';
import SEOHead from './components/SEOHead';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import PwaUpdateToast from './components/PwaUpdateToast';
import PageBackground from './components/PageBackground';

Modal.setAppElement('#root');

function AppContent() {
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
    <MotionConfig reducedMotion="user">
      <SEOHead />
      <div className="relative min-h-screen text-on-surface">
        <PageBackground />
        <ScrollToTop />
        <SectionIndicator />
        <LanguageSelector />
        <NavBar />

        <motion.div
          className="fixed left-0 right-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-[var(--color-progress-from)] via-[var(--color-progress-via)] to-[var(--color-progress-to)]"
          style={{ scaleX: progressValue }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <Header />
          <main className="mx-auto max-w-container-max px-gutter pb-8" id="main-content">
            {sections.map(({ Component, id }) => (
              <Component key={id} />
            ))}
          </main>
          <Footer />
        </div>
        <PwaUpdateToast />
        <Analytics />
        <SpeedInsights />
      </div>
    </MotionConfig>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
