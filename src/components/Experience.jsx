import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: 'Web Developer',
      company: 'Dentsu',
      period: 'July 2023 - Present',
      description: 'Client reception, switchboard management, entrance desk assistance, organization of entry and exit logs.',
    },
    {
      title: 'SQL Database Administrator',
      company: 'VICORTIZ',
      period: '2022 - 2023',
      description: 'Client reception, switchboard management, entrance desk assistance, file maintenance.',
    },
    {
      title: 'Technology/Management Systems Intern',
      company: 'BHD',
      period: 'January 2023 - April 2023',
      description: 'Client reception, switchboard management, entrance desk assistance, organization of entry and exit logs, file maintenance.',
    },
  ];

  return (
    <section ref={ref} className="py-16">
      <h2 className="section-title">Experience</h2>
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className="card mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h3 className="text-2xl font-semibold text-blue-600">{exp.title}</h3>
          <p className="text-xl text-gray-700">{exp.company}</p>
          <p className="text-gray-500 mb-2">{exp.period}</p>
          <p className="text-gray-600">{exp.description}</p>
        </motion.div>
      ))}
    </section>
  );
};

export default Experience;