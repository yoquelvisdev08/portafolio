import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import GenerateCV from './GenerateCV';

const Header = () => {
  return (
    <header className="py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          className="glass-effect rounded-lg p-8 flex flex-col md:flex-row items-center justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1
          }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
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
              className="w-80 h-auto shadow-2xl rounded-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[#6A9AB0]/30"
            />
          </motion.div>

          <div className="text-center md:text-left">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              <motion.div
                className="flex flex-col space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="inline-block sparkle-text"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{
                    color: '#EAD8B1',
                    textShadow: `
                      0 0 2px #EAD8B1,
                      0 0 4px #6A9AB0,
                      0 0 6px #6A9AB0
                    `,
                    animation: 'flicker 2s infinite alternate, sparkle 1.5s infinite',
                    paddingLeft: '10px'
                  }}
                >
                  &gt;_Yoquelvis
                </motion.span>
                <motion.span
                  className="inline-block"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{
                    color: '#EAD8B1',
                    textShadow: `
                      0 0 4px #EAD8B1,
                      0 0 8px #EAD8B1,
                      0 0 12px #6A9AB0,
                      0 0 16px #6A9AB0
                    `,
                    animation: 'flicker 2s infinite alternate',
                    paddingLeft: '20px'
                  }}
                >
                  &gt;_Jorge
                </motion.span>
                <motion.span
                  className="inline-block"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{
                    color: '#EAD8B1',
                    textShadow: `
                      0 0 4px #EAD8B1,
                      0 0 8px #EAD8B1,
                      0 0 12px #6A9AB0,
                      0 0 16px #6A9AB0
                    `,
                    animation: 'flicker 1.8s infinite alternate',
                    paddingLeft: '30px'
                  }}
                >
                  &gt;_Abreu
                </motion.span>
              </motion.div>
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-white mb-6"
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
              <a href="https://www.linkedin.com/in/yoquelvis-jorge-abreu-5ba2a4234/" className="text-4xl text-white hover:text-[#6A9AB0] transition-colors duration-300">
                <FaLinkedin />
              </a>
              <a href="https://github.com/yoquelvisdev08" className="text-4xl text-white hover:text-gray-400 transition-colors duration-300">
                <FaGithub />
              </a>
              <a href="https://www.instagram.com/yoquelvis_08" className="text-4xl text-white hover:text-blue-300 transition-colors duration-300">
                <FaInstagram />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center md:justify-start"
            >
              <GenerateCV />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
