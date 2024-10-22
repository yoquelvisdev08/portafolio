import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';

const education = [
  { degree: 'Bachelor of Science in Computer Science', institution: 'University of Example', year: '2020' },
  { degree: 'Full Stack Web Development Bootcamp', institution: 'Tech Academy', year: '2021' },
];

function Education() {
  return (
    <section className="my-16">
      <motion.h2 
        className="section-title text-white"
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
            className="card p-6 bg-gradient-to-br from-blue-900 to-purple-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center mb-4">
              <FaGraduationCap className="text-3xl mr-4 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
            </div>
            <p className="text-white mb-2">{edu.institution}</p>
            <p className="text-blue-200">{edu.year}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Education;
