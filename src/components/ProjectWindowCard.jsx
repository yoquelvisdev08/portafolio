import React, { useCallback, useRef } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { projectPreviews, projectWindowFiles } from '../data/portfolioData';
import { listItem } from '../lib/motion';

function ProjectWindowCard({ project, shouldReduceMotion, motionProps = {} }) {
  const { t } = useTranslation();
  const tiltRef = useRef(null);
  const preview = projectPreviews[project.icon];
  const windowFile = projectWindowFiles[project.icon] || 'project.tsx';
  const projectUrl = project.link || project.github || null;
  const statusKey = project.status || 'live';
  const statusLabel = t(`projects.status.${statusKey}`, statusKey);

  const resetTilt = useCallback(() => {
    if (tiltRef.current) {
      tiltRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      if (shouldReduceMotion || !tiltRef.current) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      tiltRef.current.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    },
    [shouldReduceMotion],
  );

  const previewContent = preview ? (
    <div className="project-window__preview">
      <img
        src={preview}
        alt={project.title}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        draggable="false"
      />
      <div className="project-window__scanline" aria-hidden="true" />
    </div>
  ) : null;

  return (
    <motion.article
      className="project-window"
      variants={motionProps.variants || listItem}
      role={motionProps.role}
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <div className="project-window__shell group glass-card overflow-hidden rounded-card">
        <div className="project-window__chrome">
          <div className="terminal-dots" aria-hidden="true">
            <div className="terminal-dot dot-red" />
            <div className="terminal-dot dot-yellow" />
            <div className="terminal-dot dot-green" />
          </div>
          <span className="project-window__filename font-mono text-xs text-on-surface-variant">
            {windowFile}
          </span>
          <span
            className={`project-window__status font-mono text-[10px] uppercase tracking-widest ${
              statusKey === 'live' ? 'project-window__status--live' : 'project-window__status--demo'
            }`}
          >
            {statusLabel}
          </span>
        </div>

        {previewContent && (
          <div
            className="project-window__preview-stage"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
          >
            <div ref={tiltRef} className="project-window__preview-tilt">
              {projectUrl ? (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-window__preview-link"
                  aria-label={`${t('projects.viewProject')} ${project.title}`}
                >
                  {previewContent}
                </a>
              ) : (
                previewContent
              )}
            </div>
          </div>
        )}

        <div className="project-window__body">
          {projectUrl ? (
            <h3 className="mb-2 text-xl font-semibold text-on-surface" itemProp="name">
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-window__title-link transition-colors hover:text-primary-fixed"
              >
                {project.title}
              </a>
            </h3>
          ) : (
            <h3
              className="mb-2 text-xl font-semibold text-on-surface transition-colors group-hover:text-primary-fixed"
              itemProp="name"
            >
              {project.title}
            </h3>
          )}

          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-on-surface-variant" itemProp="description">
            {project.description}
          </p>

          {project.technologies && (
            <div className="mb-5 flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="soft-chip">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="soft-chip">+{project.technologies.length - 5}</span>
              )}
            </div>
          )}

          <div className="project-window__actions flex flex-wrap gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label={`${t('projects.viewProject')} ${project.title}`}
              >
                {t('projects.viewProject')}
                <FaExternalLinkAlt aria-hidden="true" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label={`GitHub ${project.title}`}
              >
                <FaGithub aria-hidden="true" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectWindowCard;
