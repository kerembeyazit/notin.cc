'use client';

import { useEffect, useState } from 'react';

export function PWADebug() {
  const [debugInfo, setDebugInfo] = useState<{
    manifestLoaded: boolean;
    serviceWorkerRegistered: boolean;
    installable: boolean;
    errors: string[];
  }>({
    manifestLoaded: false,
    serviceWorkerRegistered: false,
    installable: false,
    errors: [],
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkPWA = async () => {
      const errors: string[] = [];
      let manifestLoaded = false;
      let serviceWorkerRegistered = false;
      let installable = false;

      // Check manifest
      try {
        const manifestLink = document.querySelector('link[rel="manifest"]');
        if (manifestLink) {
          manifestLoaded = true;
        } else {
          errors.push('Manifest link not found in HTML');
        }

        // Try to fetch manifest
        const manifestResponse = await fetch('/site.webmanifest');
        if (manifestResponse.ok) {
          const manifest = await manifestResponse.json();
          if (!manifest.name || !manifest.short_name || !manifest.icons) {
            errors.push('Manifest missing required fields');
          } else {
            manifestLoaded = true;
          }
        } else {
          errors.push(`Manifest fetch failed: ${manifestResponse.status}`);
        }
      } catch (error) {
        errors.push(`Manifest check error: ${error}`);
      }

      // Check service worker
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          serviceWorkerRegistered = !!registration;
          if (!serviceWorkerRegistered) {
            errors.push('Service Worker not registered');
          }
        } catch (error) {
          errors.push(`Service Worker check error: ${error}`);
        }
      } else {
        errors.push('Service Worker not supported');
      }

      // Check if installable (beforeinstallprompt event)
      installable = 'onbeforeinstallprompt' in window;

      setDebugInfo({
        manifestLoaded,
        serviceWorkerRegistered,
        installable,
        errors,
      });
    };

    checkPWA();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('✅ PWA install prompt available');
      setDebugInfo((prev) => ({ ...prev, installable: true }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 text-xs max-w-sm z-50 shadow-lg">
      <div className="font-bold mb-2">PWA Debug Info</div>
      <div className="space-y-1">
        <div>
          Manifest:{' '}
          <span className={debugInfo.manifestLoaded ? 'text-green-500' : 'text-red-500'}>
            {debugInfo.manifestLoaded ? '✅' : '❌'}
          </span>
        </div>
        <div>
          Service Worker:{' '}
          <span
            className={debugInfo.serviceWorkerRegistered ? 'text-green-500' : 'text-red-500'}
          >
            {debugInfo.serviceWorkerRegistered ? '✅' : '❌'}
          </span>
        </div>
        <div>
          Installable:{' '}
          <span className={debugInfo.installable ? 'text-green-500' : 'text-yellow-500'}>
            {debugInfo.installable ? '✅' : '⏳'}
          </span>
        </div>
        {debugInfo.errors.length > 0 && (
          <div className="mt-2 pt-2 border-t border-border">
            <div className="font-semibold text-red-500">Errors:</div>
            {debugInfo.errors.map((error, i) => (
              <div key={i} className="text-red-400">
                • {error}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

