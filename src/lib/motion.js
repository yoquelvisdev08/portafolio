const STANDARD_EASE = [0.22, 1, 0.36, 1];

export const timings = {
  instant: 0,
  fast: 0.2,
  quick: 0.28,
  base: 0.34,
  medium: 0.42,
  slow: 0.6,
};

export const sectionViewport = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -12% 0px',
};

export const listViewport = {
  once: true,
  amount: 0.14,
  margin: '0px 0px -10% 0px',
};

export const revealContainer = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timings.slow,
      ease: STANDARD_EASE,
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

export const revealItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timings.medium,
      ease: STANDARD_EASE,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: timings.quick,
      ease: STANDARD_EASE,
    },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: timings.quick,
      ease: STANDARD_EASE,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: timings.fast,
      ease: STANDARD_EASE,
    },
  },
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: timings.medium,
      type: 'spring',
      stiffness: 240,
      damping: 20,
    },
  },
};

export const toastSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timings.fast,
      ease: STANDARD_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: timings.fast,
      ease: STANDARD_EASE,
    },
  },
};

export const listContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

export const listItem = {
  hidden: { opacity: 0, y: 14, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: timings.base,
      ease: STANDARD_EASE,
    },
  },
};

export const reducedMotionVariant = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
};

export const interactionTransition = {
  duration: timings.fast,
  ease: STANDARD_EASE,
};

export const cardInteractions = {
  whileHover: { y: -3, scale: 1.01 },
  whileTap: { scale: 0.99 },
  whileFocus: { y: -2 },
  transition: interactionTransition,
};

export const buttonInteractions = {
  whileHover: { y: -1, scale: 1.02 },
  whileTap: { scale: 0.98 },
  whileFocus: { y: -1 },
  transition: interactionTransition,
};
