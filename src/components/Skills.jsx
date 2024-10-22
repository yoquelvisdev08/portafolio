import React from 'react';
import { FaReact, FaJs, FaHtml5, FaCss3, FaNode, FaGit } from 'react-icons/fa';
import { motion } from 'framer-motion';

const skills = [
  { name: 'React', icon: FaReact },
  { name: 'JavaScript', icon: FaJs },
  { name: 'HTML5', icon: FaHtml5 },
  { name: 'CSS3', icon: FaCss3 },
  { name: 'Node.js', icon: FaNode },
  { name: 'Git', icon: FaGit },
];

function Skills() {
  return (
    <section className="my-16">
      <motion.h2 
        className="section-title text-white"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills 🚀
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <motion.div 
            key={index} 
            className="card flex flex-col items-center p-4 bg-gradient-to-br from-blue-900 to-purple-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <skill.icon className="text-5xl mb-4 text-blue-400" />
            <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
