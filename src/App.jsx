import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import { motion, useScroll, useSpring } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900" />
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            animation: `float ${Math.random() * 10 + 5}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
};

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
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-5xl">
          {[About, Experience, Skills, Projects, Education, Contact].map((Section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Section />
            </motion.div>
          ))}
        </main>
        <footer className="bg-gray-900 text-white text-center py-4">
          <p>&copy; 2023 Yoquelvis Jorge Abreu. All rights reserved.</p>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;
