import { useEffect, useRef, useState } from 'react';

// Invalid stored content is preserved instead of overwritten with defaults.
export function useLocalStorage(key, createInitial, validate) {
  const [initial] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return { value: createInitial(), raw, blocked: false, error: '' };
      const value = JSON.parse(raw);
      if (!validate(value)) throw new Error('Invalid saved data');
      return { value, raw, blocked: false, error: '' };
    } catch {
      return { value: [], raw: null, blocked: true, error: 'Saved data could not be read. The stored content has been preserved. Export it from browser storage before resetting; changes in this session cannot be saved.' };
    }
  });
  const [value, setValue] = useState(initial.value);
  const [error, setError] = useState(initial.error);
  const rawRef = useRef(initial.raw);
  const blocked = useRef(initial.blocked);
  useEffect(() => {
    if (blocked.current) return;
    try {
      if (localStorage.getItem(key) !== rawRef.current) {
        blocked.current = true;
        setError('This workspace changed in another tab. Reload before editing further to avoid overwriting newer work. Current changes are not saved.');
        return;
      }
      const raw = JSON.stringify(value);
      localStorage.setItem(key, raw);
      rawRef.current = raw;
      setError('');
    } catch {
      setError('Browser storage is unavailable or full. Changes are only in memory and may be lost on reload. Free space or allow storage, then edit and save again.');
    }
  }, [key, value]);
  useEffect(() => {
    const changed = event => {
      if ((event.key === key || event.key === null) && event.storageArea === localStorage) {
        blocked.current = true;
        setError('This workspace changed in another tab. Reload to load its saved version. Current changes are not saved.');
      }
    };
    window.addEventListener('storage', changed);
    return () => window.removeEventListener('storage', changed);
  }, [key]);
  return [value, setValue, error];
}
