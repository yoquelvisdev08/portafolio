import React from 'react';
import { FaExternalLinkAlt, FaGithub, FaBarcode, FaUserCircle, FaTheaterMasks, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function Projects() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true });

  // Mapeo de iconos por tipo
  const iconMap = {
    barcode: <FaBarcode className="text-4xl text-[#EAD8B1]" />,
    avatar: <FaUserCircle className="text-4xl text-[#EAD8B1]" />,
    jokes: <FaTheaterMasks className="text-4xl text-[#EAD8B1]" />,
    schedule: <FaCalendarAlt className="text-4xl text-[#EAD8B1]" />
  };

  return (
    <section className="my-16">
      <motion.h2 
        className="section-title text-white"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('projects.title')}
      </motion.h2>
      <motion.p 
        className="text-[#6A9AB0] text-center mb-8 text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {t('projects.description')}
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="card hover-lift bg-gradient-to-br from-[#3A6D8C]/20 to-[#6A9AB0]/20 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="mb-4">{iconMap[project.icon] || <span className="text-4xl">🚀</span>}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#EAD8B1]">{project.title}</h3>
            <p className="text-[#6A9AB0] mb-4 flex-grow">{project.description}</p>
            
            {/* Tags de tecnologías */}
            {project.technologies && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-xs bg-[#3A6D8C]/40 text-[#EAD8B1] px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-auto">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center bg-[#3A6D8C] hover:bg-[#6A9AB0] text-[#EAD8B1] font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  {t('projects.viewProject')} <FaExternalLinkAlt className="ml-2" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#1a1a2e] hover:bg-[#2a2a3e] text-[#EAD8B1] font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  <FaGithub className="mr-2" /> GitHub
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
