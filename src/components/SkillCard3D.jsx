import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { listItem } from '../lib/motion';

function SkillCard3D({ children, className = '', shouldReduceMotion = false, motionProps = {} }) {
  const innerRef = useRef(null);

  const resetTilt = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      if (shouldReduceMotion || !innerRef.current) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      innerRef.current.style.transform = `rotateX(${(-y * 14).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg) translateZ(12px)`;
    },
    [shouldReduceMotion],
  );

  return (
    <motion.article
      className={`skill-card-3d ${className}`.trim()}
      variants={motionProps.variants || listItem}
      role={motionProps.role}
      itemScope={motionProps.itemScope}
      itemType={motionProps.itemType}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div ref={innerRef} className="skill-card-3d__inner glass-card group h-full rounded-card p-6">
        <div className="skill-card-3d__shine" aria-hidden="true" />
        {children}
      </div>
    </motion.article>
  );
}

export default SkillCard3D;
