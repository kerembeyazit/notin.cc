'use client';

import { useEffect } from 'react';

export function PWARegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if service worker is supported
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker is not supported in this browser');
      return;
    }

    // Check if we're in HTTPS or localhost (required for service workers)
    if (
      location.protocol !== 'https:' &&
      location.hostname !== 'localhost' &&
      location.hostname !== '127.0.0.1'
    ) {
      console.warn(
        'Service Workers require HTTPS (or localhost). Current protocol:',
        location.protocol
      );
      return;
    }

    const registerServiceWorker = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log(
            '✅ Service Worker registered successfully:',
            registration.scope
          );

          // Check for updates
          registration.addEventListener('updatefound', () => {
            console.log('🔄 Service Worker update found');
          });
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
          console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            browser: navigator.userAgent,
          });
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

