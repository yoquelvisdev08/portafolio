import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          className="glass-effect rounded-lg p-12 flex flex-col md:flex-row items-center justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mr-12 mb-8 md:mb-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="/me.JPG"
              alt="Yoquelvis Jorge Abreu"
              className="w-64 h-auto shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            />
          </motion.div>
          <div className="text-center md:text-left">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                background: 'linear-gradient(45deg, #4F46E5, #06B6D4, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Yoquelvis Jorge Abreu
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-blue-200 dark:text-blue-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Software Developer
            </motion.p>
            <motion.div
              className="mb-8 flex justify-center md:justify-start space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <a href="#" className="text-4xl text-white hover:text-blue-400 transition-colors duration-300">
                <FaLinkedin />
              </a>
              <a href="#" className="text-4xl text-white hover:text-gray-400 transition-colors duration-300">
                <FaGithub />
              </a>
              <a href="#" className="text-4xl text-white hover:text-blue-300 transition-colors duration-300">
                <FaTwitter />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a href="#contact" className="btn-primary text-xl py-3 px-8 rounded-full hover-lift">
                Get in touch
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
