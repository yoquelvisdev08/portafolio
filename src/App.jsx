import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import SoundEffects from './components/SoundEffects';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaEnvelope, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const AnimatedBackground = () => {
  const [colors, setColors] = useState(['#3B82F6', '#8B5CF6', '#EC4899']);

  useEffect(() => {
    const interval = setInterval(() => {
      setColors(prevColors => {
        const newColors = [...prevColors];
        newColors.push(newColors.shift());
        return newColors;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const shapes = [
    { type: 'circle', count: 50 },
    { type: 'square', count: 30 },
    { type: 'triangle', count: 20 },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute inset-0 transition-colors duration-5000 ease-in-out"
        style={{
          background: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]}, ${colors[2]})`
        }}
      />
      {shapes.map(({ type, count }) =>
        [...Array(count)].map((_, i) => (
          <motion.div
            key={`${type}-${i}`}
            className={`absolute ${type === 'circle' ? 'rounded-full' : type === 'square' ? 'rounded-sm' : ''} bg-white`}
            initial={{
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              x: [null, Math.random() * window.innerWidth, null],
              y: [null, Math.random() * window.innerHeight, null],
              rotate: type !== 'circle' ? [0, 180, 360] : 0,
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut",
            }}
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              clipPath: type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
            }}
          />
        ))
      )}
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const toggleSound = () => {
    setIsSoundEnabled(prevState => !prevState);
  };

  return (
    <div className={`min-h-screen text-white ${darkMode ? 'dark' : ''}`}>
      <SoundEffects isSoundEnabled={isSoundEnabled} />
      <AnimatedBackground />
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-5xl">
          <AnimatePresence>
            {[About, Experience, Skills, Projects, Education, Contact].map((Section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Section />
              </motion.div>
            ))}
          </AnimatePresence>
        </main>
        <footer className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-lg font-semibold text-white">&copy; 2023 Yoquelvis Jorge Abreu</p>
                <p className="text-sm text-white">All rights reserved</p>
              </div>
              <div className="flex space-x-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                  <FaGithub size={24} />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                  <FaLinkedin size={24} />
                </a>
                <a href="mailto:your.email@example.com" className="text-white hover:text-gray-300 transition-colors">
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <motion.button
          className="p-3 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 shadow-lg z-50 hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSound}
        >
          {isSoundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </motion.button>
        <motion.button
          className="p-3 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 shadow-lg z-50 hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </motion.button>
      </div>
    </div>
  );
}

export default App;
