import React from 'react';
import { useReducedMotion } from 'framer-motion';

function PageBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="page-background" aria-hidden="true">
      <div className="page-background__base" />
      <div
        className={`page-background__orb page-background__orb--primary${
          shouldReduceMotion ? '' : ' page-background__orb--float'
        }`}
      />
      <div
        className={`page-background__orb page-background__orb--secondary${
          shouldReduceMotion ? '' : ' page-background__orb--float-slow'
        }`}
      />
      <div className="page-background__orb page-background__orb--accent" />
      <div className="page-background__mesh" />
      <div className="page-background__vignette" />
      <div className="page-background__noise" />
    </div>
  );
}

export default PageBackground;
