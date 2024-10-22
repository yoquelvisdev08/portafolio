import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactItems = [
    { icon: FaPhone, text: "(829) 422-3313", href: "tel:+18294223313" },
    { icon: FaEnvelope, text: "yoquelvis18@gmail.com", href: "mailto:yoquelvis18@gmail.com" },
    { icon: FaGlobe, text: "https://yoquelvisdev.com/", href: "https://yoquelvisdev.com/" },
  ];

  return (
    <section ref={ref} className="py-16">
      <motion.h2 
        className="section-title text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Contact
      </motion.h2>
      <motion.div
        className="card space-y-6 bg-gradient-to-br from-blue-900 to-purple-900"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {contactItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            className="flex items-center text-white hover:text-blue-300 transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <item.icon className="h-6 w-6 mr-4 text-blue-400" />
            <span className="text-lg">{item.text}</span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default Contact;
