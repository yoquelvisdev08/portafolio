import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = [
    {
      degree: 'Software Engineering',
      institution: 'Universidad APEC',
      status: 'Currently studying',
    },
    {
      degree: 'Technology in Software Development',
      institution: 'Instituto Tecnológico de las Américas (ITLA)',
      period: '2021-2023',
    },
  ];

  return (
    <section ref={ref} className="py-16">
      <h2 className="section-title">Education</h2>
      {education.map((edu, index) => (
        <motion.div
          key={index}
          className="card mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h3 className="text-2xl font-semibold text-blue-600">{edu.degree}</h3>
          <p className="text-xl text-gray-700">{edu.institution}</p>
          <p className="text-gray-500">{edu.period || edu.status}</p>
        </motion.div>
      ))}
    </section>
  );
};

export default Education;