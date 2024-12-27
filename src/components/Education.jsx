import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';

const education = [
  { degree: 'SOFTWARE ENGINEERING', institution: 'APEC UNIVERSITY', year: '2023 - PRESENT' },
  { degree: 'FUNDAMENTALS IN DEVOPS, APIS AND MICROSERVICES ARCHITECTURE', institution: 'Udemy', year: '2024' },
  { degree: 'SOFTWARE TESTING', institution: 'Udemy', year: '2023' },
  { degree: 'SOFTWARE DEVELOPMENT TECHNOLOGIST', institution: 'Instituto Tecnológico de las Américas (ITLA)', year: '2021 - 2023' },
  { degree: 'ETHICAL HACKING', institution: 'Instituto Tecnológico de las Américas (ITLA)', year: '2022' },
  { degree: 'BIG DATA', institution: 'Pontificia Universidad Católica Madre y Maestra (PUCMM)', year: '2021' },
  { degree: 'GIT MANAGEMENT ', institution: 'Máster Mind', year: '2021' },
  { degree: 'LINUX MANAGEMENT ', institution: 'Máster Mind', year: '2021' },
  
  
  
  
  
];

function Education() {
  return (
    <section className="my-16">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Education 🎓
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {education.map((edu, index) => (
          <motion.div 
            key={index} 
            className="card p-6 bg-gradient-to-br from-[#001F3F] to-[#3A6D8C]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center mb-4">
              <FaGraduationCap className="text-3xl mr-4 text-[#6A9AB0]" />
              <h3 className="text-xl font-semibold text-[#EAD8B1]">{edu.degree}</h3>
            </div>
            <p className="text-white mb-2">{edu.institution}</p>
            <p className="text-white/80">{edu.year}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Education;
