'use client';

import { useEffect } from 'react';

export function PWARegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if service worker is supported
    if (!('serviceWorker' in navigator)) {
      return;
    }

    // Check if we're in HTTPS or localhost (required for service workers)
    if (
      location.protocol !== 'https:' &&
      location.hostname !== 'localhost' &&
      location.hostname !== '127.0.0.1'
    ) {
      return;
    }

    const registerServiceWorker = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          // Check for updates
          registration.addEventListener('updatefound', () => {
            // Silent update check
          });
        })
        .catch(() => {
          // Silent fail
        });
    };

    // Register immediately if page is already loaded, otherwise wait for load
    if (document.readyState === 'complete') {
      registerServiceWorker();
    } else {
      window.addEventListener('load', registerServiceWorker);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);

  return null;
}

