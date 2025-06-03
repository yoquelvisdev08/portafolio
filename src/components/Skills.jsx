import React from 'react';
import { FaReact, FaJs, FaHtml5, FaCss3, FaNode, FaGit, FaDatabase, FaLinux, FaApple, FaPython, FaInfoCircle, FaDocker } from 'react-icons/fa';
import { SiSelenium, SiPowerbi } from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { VscServerProcess } from 'react-icons/vsc';
import { motion } from 'framer-motion';

const skills = [
  { 
    name: 'React', 
    icon: FaReact, 
    competency: 'Professional Mastery', 
    projects: 5,
    description: 'Development of complex and scalable web applications'
  },
  { 
    name: 'JavaScript', 
    icon: FaJs, 
    competency: 'Expert', 
    projects: 8,
    description: 'Implementation of innovative frontend and backend solutions'
  },
  { 
    name: 'Node.js', 
    icon: FaNode, 
    competency: 'Advanced', 
    projects: 4,
    description: 'Building robust RESTful APIs and microservices'
  },
  { 
    name: 'Python', 
    icon: FaPython, 
    competency: 'Specialist', 
    projects: 6,
    description: 'Development of automation scripts and data analysis'
  },
  { 
    name: 'SQL', 
    icon: FaDatabase, 
    competency: 'Professional', 
    projects: 3,
    description: 'Management and optimization of enterprise databases'
  },
  { 
    name: 'Git', 
    icon: FaGit, 
    competency: 'Expert', 
    projects: 7,
    description: 'Version control and collaboration in development teams'
  },
  { 
    name: 'Machine Learning', 
    icon: GiArtificialIntelligence, 
    competency: 'Advanced Intermediate', 
    projects: 2,
    description: 'Implementation of predictive models and data analysis'
  },
  { 
    name: 'Docker', 
    icon: FaDocker, 
    competency: 'Professional', 
    projects: 3,
    description: 'Containerization and deployment of scalable applications'
  }
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
        Technical Skills 🚀
      </motion.h2>
      <motion.div
        className="flex items-center justify-center mb-4 text-blue-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <FaInfoCircle className="info-icon mr-2" />
        <p>Explore my professional skills and expertise</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div 
            key={index}
            className="bg-gradient-to-br from-[#001F3F] to-[#3A6D8C] rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center mb-4">
              <skill.icon className="text-4xl text-[#6A9AB0] mr-4" />
              <div>
                <h3 className="text-xl font-bold text-[#EAD8B1]">{skill.name}</h3>
                <p className="text-sm text-white/80">{skill.competency}</p>
              </div>
            </div>
            <div className="bg-[#002B4D] rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-white/70">Projects Completed</span>
                <span className="font-bold text-[#EAD8B1]">{skill.projects}</span>
              </div>
              <p className="text-sm text-white/70 italic">{skill.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
