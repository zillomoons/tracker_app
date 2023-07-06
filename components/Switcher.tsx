'use client';
import { useThemeContext } from '@/context/theme-context';
import React from 'react';

export const Switcher = () => {
  const { theme, setTheme } = useThemeContext();
  return (
    <label
      className='switch'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <input type='checkbox' />
      <span className='slider'></span>
    </label>
  );
};
