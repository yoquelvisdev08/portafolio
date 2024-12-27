import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120
    }
  }
};

function About() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      <motion.div variants={itemVariants}>
        <h2 className="section-title">About Me 👨‍💻</h2>
        <div className="card mt-4">
          <p className="mb-4 text-white">
            Hello! I'm Yoquelvis Jorge Abreu, a passionate web developer with a love for creating beautiful and functional websites. 🚀
          </p>
          <p className="mb-4 text-white">
            I specialize in front-end development, with expertise in React, JavaScript, HTML5, and modern CSS frameworks like Tailwind CSS. 💻
          </p>
          <p className="mb-4 text-white">
            Additionally, I have experience with Node.js, allowing me to work on full-stack projects. 🌐
          </p>
          <p className="mb-4 text-white">
            My skill set also includes Git for version control, SQL for database management, and Linux for server environments. 🛠️
          </p>
          <p className="mb-4 text-white">
            I am familiar with Python and Machine Learning, which expands my capabilities in data analysis and AI-driven projects. 🤖
          </p>
          <p className="mb-4 text-white">
            Moreover, I have experience in Power BI for data visualization, and I'm knowledgeable in Microservices architecture for scalable applications. 📊🔧
          </p>

          <p className="mb-4 text-white">
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee. ☕
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default About;
