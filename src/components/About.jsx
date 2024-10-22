import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">About Me</h2>
        <div className="card">
          <p className="text-lg text-gray-700 leading-relaxed">
            I'm a software developer with 2 years of experience in designing, developing, and implementing various applications. I specialize in creating efficient and scalable solutions, always maintaining high standards of quality and usability. I possess solid knowledge in various technologies and programming languages, and I have a strong ability to collaborate with multidisciplinary teams.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;