import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, defaultValue: null) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return defaultValue;
    let currentValue;

    try {
      currentValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
