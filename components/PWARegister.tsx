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

    let updateInterval: NodeJS.Timeout | null = null;

    const registerServiceWorker = () => {
      navigator.serviceWorker
        .register('/sw.js', { 
          scope: '/',
          updateViaCache: 'none' // Always check for updates
        })
        .then((registration) => {
          // Check for updates immediately
          registration.update();
          
          // Check for updates periodically (every 5 minutes)
          updateInterval = setInterval(() => {
            registration.update();
          }, 5 * 60 * 1000);
          
          // Listen for new service worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker is ready, reload page to activate it
                  window.location.reload();
                }
              });
            }
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
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, []);

  return null;
}

