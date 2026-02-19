import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  schema: z.ZodSchema<T>
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) {
        return defaultValue;
      }
      const parsed = JSON.parse(stored) as unknown;
      return schema.parse(parsed);
    } catch (error) {
      console.error(`[useLocalStorage] Failed to load ${key}:`, error);
      return defaultValue;
    }
  });

  // Debounced write to localStorage (500ms)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const validated = schema.parse(value);
        const serialized = JSON.stringify(validated);
        localStorage.setItem(key, serialized);
      } catch (error) {
        console.error(`[useLocalStorage] Failed to save ${key}:`, error);
      }
    }, 500);

    return () => { clearTimeout(timeoutId); };
  }, [key, value, schema]);

  const updateValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(newValue);
  }, []);

  return [value, updateValue];
}
