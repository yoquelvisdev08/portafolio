import { motion, useScroll, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const { scrollY } = useScroll();
  const controls = useAnimation();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 200) {
        controls.start({ opacity: 1, x: 0 });
      } else {
        controls.start({ opacity: 0, x: 20 });
      }
    });
  }, [scrollY, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      className="fixed bottom-4 right-20 p-3 rounded-full bg-[#3A6D8C] text-[#EAD8B1] shadow-lg z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={controls}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
    >
      <FaArrowUp size={20} />
    </motion.button>
  );
};

export default ScrollToTop;
