import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="glass-effect rounded-lg p-8 flex flex-col md:flex-row items-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mr-8 mb-6 md:mb-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://avatars.dicebear.com/api/initials/YJA.svg"
              alt="Yoquelvis Jorge Abreu"
              className="w-40 h-40 rounded-full border-4 border-blue-300 shadow-lg animate-float"
            />
          </motion.div>
          <div className="text-center md:text-left">
            <motion.h1 
              className="text-6xl font-bold mb-4 text-shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                background: 'linear-gradient(45deg, #4F46E5, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Yoquelvis Jorge Abreu
            </motion.h1>
            <motion.p 
              className="text-2xl text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Software Developer
            </motion.p>
            <motion.div
              className="mt-4 flex justify-center md:justify-start space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <a href="#" className="text-3xl text-white hover:text-blue-400 transition-colors duration-300">
                <FaLinkedin />
              </a>
              <a href="#" className="text-3xl text-white hover:text-gray-400 transition-colors duration-300">
                <FaGithub />
              </a>
              <a href="#" className="text-3xl text-white hover:text-blue-300 transition-colors duration-300">
                <FaTwitter />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a href="#contact" className="btn-primary mt-6 inline-block hover-lift">
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
