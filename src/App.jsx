import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  
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
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen text-white ${darkMode ? 'dark' : ''}`}>
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
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-5xl">
          {[About, Experience, Skills, Projects, Education, Contact].map((Section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Section />
            </motion.div>
          ))}
        </main>
      </motion.div>

      <motion.button
        className="fixed bottom-4 right-4 p-3 rounded-full bg-[#3A6D8C] text-[#EAD8B1] shadow-lg z-50 hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </motion.button>

      <footer className="mt-16 py-8 bg-gradient-to-r from-[#001F3F] via-[#3A6D8C] to-[#6A9AB0]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#EAD8B1] mb-4 md:mb-0">
              © 2024 Yoquelvis Jorge Abreu. All rights reserved.
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
