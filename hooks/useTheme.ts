'use client';

import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme | null>('theme', null);
  const [systemTheme, setSystemTheme] = useState<Theme>('light');

  // Get system preference
  useEffect(() => {
    const getSystemTheme = (): Theme => {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light';
    };

    setSystemTheme(getSystemTheme());

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Use system theme if no user preference is set
  const themeValue = theme || systemTheme;

  useEffect(() => {
    const root = document.documentElement;
    
    if (themeValue === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeValue]);

  const toggleTheme = () => {
    const currentTheme = theme || systemTheme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return { theme: themeValue, toggleTheme };
}

