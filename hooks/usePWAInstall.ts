'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Detect Firefox browser
function isFirefox(): boolean {
  if (typeof window === 'undefined') return false;
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

// Detect if mobile device
function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isFirefoxBrowser, setIsFirefoxBrowser] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Detect browser and device
    setIsFirefoxBrowser(isFirefox());
    setIsMobileDevice(isMobile());

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if already installed via other methods
    if ((window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    // Add listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if we should show install button even without beforeinstallprompt
    // Chrome sometimes doesn't fire the event, but the app is still installable
    const checkInstallability = async () => {
      try {
        // Check if service worker is registered
        const hasServiceWorker = 'serviceWorker' in navigator;
        let swRegistered = false;
        
        if (hasServiceWorker) {
          const reg = await navigator.serviceWorker.getRegistration();
          swRegistered = !!reg;
        }

        // Check if manifest is valid
        const manifestRes = await fetch('/site.webmanifest');
        const manifest = await manifestRes.json();
        const hasValidManifest = manifest && manifest.name && manifest.icons && manifest.icons.length > 0;

        // Show install button if all requirements are met, even without beforeinstallprompt
        // Firefox also supports PWA on mobile, so show button for Firefox mobile too
        if (swRegistered && hasValidManifest && !isInstalled) {
          setShowInstallButton(true);
        }
      } catch (error) {
        // Silent fail
      }
    };

    // Check after a delay to see if beforeinstallprompt fires
    const timeout = setTimeout(() => {
      if (!isInstallable && !isInstalled) {
        checkInstallability();
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async () => {
    // If we have the deferred prompt, use it
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
          setIsInstallable(false);
          setDeferredPrompt(null);
          setShowInstallButton(false);
          return true;
        }
        
        setDeferredPrompt(null);
        return false;
      } catch (error) {
        return false;
      }
    }
    
    // If no deferred prompt, guide user based on browser
    if (isFirefoxBrowser) {
      if (isMobileDevice) {
        // Firefox Mobile: Use menu → Add to Home Screen
        alert(
          'Firefox\'ta uygulamayı kurmak için:\n\n' +
          '1. Menü butonuna (üç nokta) tıklayın\n' +
          '2. "Ana ekrana ekle" seçeneğini seçin\n\n' +
          'Uygulama ana ekranınıza eklenecektir.'
        );
      } else {
        // Firefox Desktop: Not fully supported yet
        alert(
          'Masaüstü Firefox\'ta PWA kurulumu henüz tam desteklenmiyor.\n\n' +
          'Alternatifler:\n' +
          '• Chrome veya Edge kullanabilirsiniz\n' +
          '• Android Firefox\'ta "Ana ekrana ekle" özelliği çalışır\n\n' +
          'Service Worker çalışıyor, offline özellikler aktif.'
        );
      }
    } else {
      // Chrome/Edge: Use address bar install icon
      alert(
        'Uygulamayı kurmak için:\n\n' +
        '• Chrome/Edge adres çubuğundaki kurulum ikonuna tıklayın\n' +
        '• Veya menüden "notin... uygulamasını yükle" seçeneğini kullanın'
      );
    }
    return false;
  };

  return {
    isInstallable: isInstallable || showInstallButton,
    isInstalled,
    install,
    hasDeferredPrompt: !!deferredPrompt,
    isFirefox: isFirefoxBrowser,
    isMobile: isMobileDevice,
  };
}

