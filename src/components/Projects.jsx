import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Avatar Generator",
    description: "It is an AI-powered platform that allows users to generate random avatars.",
    link: "https://avatar-3000.vercel.app/",
    icon: "😝"
  },
  {
    title: "Jokes Generator",
    description: "Improvised jokes and a generator of dark jokes as simple as.",
    link: "https://chistes-nine.vercel.app/",
    icon: "🤣"
  }
];

function Projects() {
  return (
    <section className="my-16">
      <motion.h2 
        className="section-title text-white"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects 🚀
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="card hover-lift bg-gradient-to-br from-[#3A6D8C]/20 to-[#6A9AB0]/20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="text-4xl mb-4">{project.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#EAD8B1]">{project.title}</h3>
            <p className="text-[#6A9AB0] mb-4">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center bg-[#3A6D8C] hover:bg-[#6A9AB0] text-[#EAD8B1] font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              View Project <FaExternalLinkAlt className="ml-2" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
