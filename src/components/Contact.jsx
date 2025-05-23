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
    { icon: FaEnvelope, text: "yoquelvis18@gmail.com", href: "mailto:yoquelvisdev@gmail.com" },
    { icon: FaGlobe, text: "https://yoquelvis.dev/", href: "https://yoquelvis.dev/" },
  ];

  return (
    <section ref={ref} className="py-4">
      <motion.h2 
        className="section-title mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Contact 📱
      </motion.h2>
      <motion.div
        className="card space-y-3 bg-gradient-to-br from-[#3A6D8C]/20 to-[#6A9AB0]/20"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {contactItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            className="flex items-center text-[#EAD8B1] hover:text-[#6A9AB0] transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <item.icon className="h-6 w-6 mr-4 text-[#6A9AB0]" />
            <span className="text-lg">{item.text}</span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default Contact;
