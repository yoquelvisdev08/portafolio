import React from 'react';
import { FaReact, FaJs, FaHtml5, FaCss3, FaNode, FaGit, FaDatabase, FaLinux, FaApple, FaPython, FaInfoCircle } from 'react-icons/fa';
import { SiSelenium, SiPowerbi } from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { VscServerProcess } from 'react-icons/vsc';
import { motion } from 'framer-motion';

const skills = [
  { name: 'React', icon: FaReact, percentage: 90 },
  { name: 'JavaScript', icon: FaJs, percentage: 95 },
  { name: 'HTML5', icon: FaHtml5, percentage: 100 },
  { name: 'CSS3', icon: FaCss3, percentage: 95 },
  { name: 'Node.js', icon: FaNode, percentage: 85 },
  { name: 'Git', icon: FaGit, percentage: 90 },
  { name: 'SQL', icon: FaDatabase, percentage: 80 },
  { name: 'Linux', icon: FaLinux, percentage: 75 },
  { name: 'Swift', icon: FaApple, percentage: 70 },
  { name: 'Selenium', icon: SiSelenium, percentage: 85 },
  { name: 'Python', icon: FaPython, percentage: 90 },
  { name: 'Machine Learning', icon: GiArtificialIntelligence, percentage: 75 },
  { name: 'Power BI', icon: SiPowerbi, percentage: 80 },
  { name: 'Microservices', icon: VscServerProcess, percentage: 85 },
];

function SkillCard({ skill }) {
  return (
    <motion.div 
      className="flip-container w-full h-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flipper w-full h-full">
        <div className="front w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#3A6D8C]/20 to-[#6A9AB0]/20 rounded-lg">
          <skill.icon className="text-4xl mb-2 text-[#6A9AB0]" />
          <h4 className="text-sm font-semibold text-[#EAD8B1] text-center">{skill.name}</h4>
        </div>
        <div className="back w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#001F3F] to-[#3A6D8C] rounded-lg">
          <h4 className="percentage-display text-[#EAD8B1]">{skill.percentage}%</h4>
          <p className="text-sm text-[#6A9AB0]">Proficiency</p>
        </div>
      </div>
    </motion.div>
  );
}

function Skills() {
  return (
    <section className="my-16">
      <motion.h2 
        className="section-title text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills 🚀
      </motion.h2>
      <motion.div
        className="flex items-center justify-center mb-4 text-blue-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <FaInfoCircle className="info-icon mr-2" />
        <p>Hover over skills to see proficiency</p>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </section>
  );
}

export default Skills;
