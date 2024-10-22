import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Portfolio Website",
    description: "A showcase of my personal portfolio website built with React and Tailwind CSS.",
    link: "/projects/portfolio-website/index.html",
    icon: "🌐"
  },
  {
    title: "Quiz App",
    description: "An interactive quiz application built with JavaScript, HTML, and CSS.",
    link: "/projects/quiz-app/index.html",
    icon: "❓"
  },
  {
    title: "Todo App",
    description: "A simple todo application built with React and local storage.",
    link: "/projects/todo-app/index.html",
    icon: "📝"
  },
  {
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current weather and forecast using a weather API.",
    link: "/projects/weather-dashboard/index.html",
    icon: "🌤️"
  },
  {
    title: "Calculator",
    description: "A basic calculator application built with JavaScript.",
    link: "/projects/calculator/index.html",
    icon: "🧮"
  },
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with user authentication and payment integration.",
    link: "/projects/e-commerce/index.html",
    icon: "🛒"
  }
];

function Projects() {
  return (
    <section className="my-16">
      <motion.h2 
        className="section-title text-white"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects 🚀
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="card hover-lift bg-gradient-to-br from-blue-900 to-purple-900"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="text-4xl mb-4">{project.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
            <p className="text-blue-200 mb-4">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              View Project <FaExternalLinkAlt className="ml-2" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
