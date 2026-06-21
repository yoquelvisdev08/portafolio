import { useEffect, useRef } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const ONE_HOUR = 60 * 60 * 1000;

function PwaAutoUpdate() {
  const updateIntervalRef = useRef(0);

  const { needRefresh, updateServiceWorker } = useRegisterSW({
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

  const [refresh] = needRefresh;

  useEffect(() => {
    if (!refresh) {
      return;
    }

    updateServiceWorker(true);
  }, [refresh, updateServiceWorker]);

  return null;
}

export default PwaAutoUpdate;
