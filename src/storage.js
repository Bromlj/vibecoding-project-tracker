import { useEffect, useRef, useState } from 'react';

// Commit storage before changing React's saved state. Failed writes leave both intact.
export function writeSnapshot(storage, key, expectedRaw, next, validate) {
  if (!validate(next)) throw new Error('This change contains invalid data. Your saved workspace has not changed.');
  if (storage.getItem(key) !== expectedRaw) {
    const failure = new Error('This workspace changed in another tab. Your draft is still here. Copy it before reloading the newer workspace.');
    failure.code = 'conflict';
    throw failure;
  }
  const raw = JSON.stringify(next);
  storage.setItem(key, raw);
  return raw;
}

export function useLocalStorage(key, createInitial, validate) {
  const [initial] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      const value = raw === null ? createInitial() : JSON.parse(raw);
      if (!validate(value)) throw new Error('Invalid saved data');
      return { value, raw, blocked: false, error: '' };
    } catch {
      return { value: null, raw: null, blocked: true, error: 'Saved workspace data could not be read. It has not been overwritten. Download the stored data for recovery before making changes.' };
    }
  });
  const [value, setValue] = useState(initial.value);
  const [error, setError] = useState(initial.error);
  const current = useRef(initial.value);
  const rawRef = useRef(initial.raw);
  const blocked = useRef(initial.blocked);
  function commit(update) {
    if (blocked.current) return { ok: false, error: error || 'Reload the newer workspace before saving. Your draft has not been discarded.' };
    try {
      const next = typeof update === 'function' ? update(current.current) : update;
      const raw = writeSnapshot(localStorage, key, rawRef.current, next, validate);
      rawRef.current = raw;
      current.current = next;
      setValue(next);
      setError('');
      return { ok: true };
    } catch (failure) {
      if (failure.code === 'conflict') blocked.current = true;
      const message = failure.code === 'conflict' ? failure.message : 'Saving failed. Your previous saved workspace is unchanged and your draft is still available. Allow browser storage or free space, then retry.';
      setError(message);
      return { ok: false, error: message };
    }
  }
  useEffect(() => {
    const changed = event => {
      if ((event.key === key || event.key === null) && event.storageArea === localStorage) {
        blocked.current = true;
        setError('Another tab changed this workspace. Copy any unfinished draft, then reload to use the newer saved version.');
      }
    };
    window.addEventListener('storage', changed);
    return () => window.removeEventListener('storage', changed);
  }, [key]);
  return [value, commit, error];
}
