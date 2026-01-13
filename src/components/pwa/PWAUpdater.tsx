'use client';

import { useEffect } from 'react';
import { register } from '@/app/register-sw';

const PWAUpdater = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && window.workbox !== undefined) {
      register({
        onUpdate: (registration) => {
          if (confirm('A new version is available! Would you like to update?')) {
            if (registration.waiting) {
              // Send message to the waiting service worker to skip waiting
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
            window.location.reload();
          }
        },
      });

      // Listen for the controlling service worker changing
      const handleControllerChange = () => {
        window.location.reload();
      };

      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

      return () => {
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      };
    }
  }, []);

  return null;
};

export default PWAUpdater;
