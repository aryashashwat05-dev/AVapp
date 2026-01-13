'use client';

import { useEffect } from 'react';
import { register } from '@/app/register-sw';

export default function PWAProvider() {
  useEffect(() => {
    if ('serviceWorker' in navigator && window.workbox !== undefined) {
      register({
        onUpdate: (registration) => {
          if (registration.waiting) {
            if (confirm('A new version is available! Would you like to update?')) {
              // Send message to the waiting service worker to skip waiting
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
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
}
