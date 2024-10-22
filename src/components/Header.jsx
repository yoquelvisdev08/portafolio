import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h1 
          className="text-5xl font-bold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Yoquelvis Jorge Abreu
        </motion.h1>
        <motion.p 
          className="text-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Software Developer
        </motion.p>
      </div>
    </header>
  );
};

export default Header;