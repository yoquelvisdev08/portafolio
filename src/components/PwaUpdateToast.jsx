import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { timings, toastSlideUp } from '../lib/motion';

const ONE_HOUR = 60 * 60 * 1000;

const PwaUpdateToast = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();
  const updateIntervalRef = useRef(0);

  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (!registration) {
        return;
      }

      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = 0;
      }

      updateIntervalRef.current = setInterval(() => {
        registration.update();
      }, ONE_HOUR);
    },
  });

  useEffect(() => {
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = 0;
      }
    };
  }, []);

  const [offline] = offlineReady;
  const [refresh] = needRefresh;
  const isOpen = offline || refresh;

  const handleClose = () => {
    offlineReady[1](false);
    needRefresh[1](false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          role="status"
          aria-live="polite"
          aria-atomic="true"
          initial={shouldReduceMotion ? { opacity: 1 } : toastSlideUp.hidden}
          animate={shouldReduceMotion ? { opacity: 1 } : toastSlideUp.visible}
          exit={shouldReduceMotion ? { opacity: 0 } : toastSlideUp.exit}
          transition={{ duration: shouldReduceMotion ? timings.instant : timings.fast }}
          className="fixed bottom-6 left-1/2 z-[70] w-[min(92vw,420px)] -translate-x-1/2 rounded-xl border border-white/20 bg-[#0d223d]/95 p-4 shadow-2xl backdrop-blur"
        >
          <p className="text-sm font-semibold text-[#f2dfbd]">
            {refresh ? t('pwa.updateReady') : t('pwa.offlineReady')}
          </p>
          <p className="mt-1 text-xs text-white/75">
            {refresh ? t('pwa.updateHint') : t('pwa.offlineHint')}
          </p>
          <div className="mt-3 flex items-center gap-3">
            {refresh && (
              <button
                type="button"
                className="rounded-md bg-[#6A9AB0] px-3 py-1.5 text-sm font-semibold text-[#081426] transition-colors hover:bg-[#84afc2] focus-visible:ring-2 focus-visible:ring-[#EAD8B1]"
                onClick={() => updateServiceWorker(true)}
              >
                {t('pwa.reload')}
              </button>
            )}
            <button
              type="button"
              className="rounded-md border border-[#6A9AB0]/55 px-3 py-1.5 text-sm text-white/90 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#EAD8B1]"
              onClick={handleClose}
            >
              {t('pwa.dismiss')}
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default PwaUpdateToast;
