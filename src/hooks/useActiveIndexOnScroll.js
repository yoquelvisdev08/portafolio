import { useEffect, useState } from 'react';

export function useActiveIndexOnScroll(itemRefs, viewportRatio = 0.38) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateActiveIndex = () => {
      const scrollMarker = window.scrollY + window.innerHeight * viewportRatio;
      let nextIndex = 0;

      itemRefs.current.forEach((element, index) => {
        if (!element) {
          return;
        }

        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        if (scrollMarker >= elementTop) {
          nextIndex = index;
        }
      });

      setActiveIndex(nextIndex);
    };

    window.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex, { passive: true });
    updateActiveIndex();

    return () => {
      window.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [itemRefs, viewportRatio]);

  return activeIndex;
}
