'use client';

import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');
  const themeValue = theme || 'light';

  useEffect(() => {
    const root = document.documentElement;
    
    if (themeValue === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeValue]);

  const toggleTheme = () => {
    const newTheme = themeValue === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return { theme: themeValue, toggleTheme };
}

