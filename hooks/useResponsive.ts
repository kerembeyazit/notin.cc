import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useResponsive() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage<boolean>('sidebarOpen', true);

  useEffect(() => {
    // Check screen size on mount and close sidebar on mobile
    const isDesktopSize = window.innerWidth >= 768;
    setIsDesktop(isDesktopSize);
    
    if (!isDesktopSize) {
      const sidebarValue = typeof isSidebarOpen === 'boolean' ? isSidebarOpen : true;
      if (sidebarValue) {
        setIsSidebarOpen(false);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Update isDesktop on resize
    const handleResize = () => {
      const isDesktopSize = window.innerWidth >= 768;
      setIsDesktop(isDesktopSize);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isDesktop,
    isSidebarOpen,
    setIsSidebarOpen,
  };
}

