'use client';
import { useThemeContext } from '@/context/theme-context';
import React from 'react';

export const ThemeButton = () => {
  const { theme, setTheme } = useThemeContext();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? 'light' : 'dark'}
    </button>
  );
};
