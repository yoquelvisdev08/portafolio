import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <About />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </main>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; 2023 Yoquelvis Jorge Abreu. All rights reserved.</p>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;