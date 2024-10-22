import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    'Web Development', 'SQL Database Administration', 'Software Testing',
    'Git', 'Linux', 'DevOps', 'APIs', 'Microservices Architecture',
    'Big Data', 'Ethical Hacking'
  ];

  return (
    <section ref={ref} className="py-16">
      <h2 className="section-title">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="card flex items-center justify-center text-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <span className="text-gray-700">{skill}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;